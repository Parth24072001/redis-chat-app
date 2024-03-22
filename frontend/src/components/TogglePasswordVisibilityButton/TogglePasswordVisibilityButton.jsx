import Viewon from "../../../assets/images/icons/eye.svg?react";
import Viewoff from "../../../assets/images/icons/eye-off.svg?react";

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
      {isPasswordShown ? <Viewoff /> : <Viewon />}
    </button>
  );
};

export default TogglePasswordVisibilityButton;
