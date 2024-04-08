/* eslint-disable react/prop-types */

import EyeOnIcon from "../../assets/images/icons/eye.svg?react";
import EyeOffIcon from "../../assets/images/icons/eye-off.svg?react";

const TogglePasswordVisibilityButton = ({
    isPasswordShown,
    togglePasswordVisibility,
}) => {
    return (
        <button
            className="eyeicon-toggle absolute right-4 h-full top-1"
            type="button"
            onClick={togglePasswordVisibility}
        >
            {isPasswordShown ? <EyeOffIcon /> : <EyeOnIcon />}
        </button>
    );
};

export default TogglePasswordVisibilityButton;
