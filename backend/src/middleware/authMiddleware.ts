import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../config/asyncHandler";
import { ApiError } from "../config/ApiError";
import { User } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check if the decoded token contains the necessary user ID (_id)
    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !decodedToken._id
    ) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Retrieve user information based on the user ID from the token
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    // Check if the user exists
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // Assign the user information to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error: any) {
    // Handle decoding errors gracefully
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired");
    } else {
      throw new ApiError(401, error.message || "Invalid access token");
    }
  }
});
