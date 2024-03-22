/* eslint-disable react/prop-types */

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
            {isPasswordShown ? <p>off</p> : <p>on</p>}
        </button>
    );
};

export default TogglePasswordVisibilityButton;
