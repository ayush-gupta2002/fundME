import { Widgets } from "@material-ui/icons";
import className from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  bgRed,
  bgWhite,
  center,
  wide,
  isDisabled,
  handleClick,
  ...rest
}) {
  const classes = className(
    rest.className,
    "flex items-center px-2 py-2 mx-2 my-2 font-bold text-white border-4",
    {
      "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-sm":
        primary,
      "bg-yellow-500 border-yellow-500 hover:bg-yellow-900": warning,
      "bg-red-500 border-red-500 hover:bg-red-900": danger,
      "bg-green-500 border-green-500 hover:bg-green-900": success,
      "bg-gray-500 border-gray-500 hover:bg-gray-900": secondary,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500 hover:bg-blue-100": outline && primary,
      "text-green-500 hover:bg-green-100": outline && success,
      "text-yellow-500 hover:bg-yellow-100": outline && warning,
      "text-red-500 hover:bg-red-100": outline && danger,
      "text-gray-500 hover:bg-gray-100": outline && secondary,
      "text-black text-sm bg-gray-400 border-none cursor-not-allowed":
        isDisabled,
      "text-white text-sm bg-red-400 border-none hover:bg-red-600": bgRed,
      "text-red-400 bg-white text-sm border-gray-300 border-2 hover:bg-gray-100 hover:border-gray-400":
        bgWhite,
      "mx-auto": center,
      "w-full": wide,
    }
  );

  return (
    <button
      className={classes}
      disabled={isDisabled}
      onClick={() => {
        handleClick();
      }}
      {...rest}
    >
      <div className="mx-auto">{children}</div>
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
  }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Only one of the variations of the button can be true");
    }
  },
};

export default Button;
