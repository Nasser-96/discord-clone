import { getTransitionClass } from "@/core/helpers/helpers";
import ComponentLoader from "./componentLoader";
import { ButtonSizeEnum, ButtonVariantsEnum } from "@/core/types&enums/enums";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariantsEnum;
  size?: ButtonSizeEnum;
}
export default function Button({
  isLoading,
  variant = ButtonVariantsEnum.NONE,
  size = ButtonSizeEnum.DEFAULT,
  ...props
}: ButtonProps) {
  const getVariants = () => {
    let className = "";
    switch (variant) {
      case ButtonVariantsEnum.PRIMARY:
        className = "bg-indigo-500 hover:bg-indigo-500/90 text-white";
        break;
      case ButtonVariantsEnum.OUTLINE:
        className =
          "border dark:border-white border-black dark:text-white text-black hover:opacity-90";
        break;
    }
    return className;
  };

  const getSize = () => {
    let className = "";
    switch (size) {
      case ButtonSizeEnum.SM:
        className = "h-9 px-3";
        break;
      case ButtonSizeEnum.LG:
        className = "h-11 px-8";
        break;
      case ButtonSizeEnum.ICON:
        className = "h-10 w-10";
        break;
      case ButtonSizeEnum.DEFAULT:
        className = "h-10 px-4 py-2";
        break;
    }
    return className;
  };

  return (
    <button
      {...props}
      className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center rounded-md relative ${getSize()} ${getTransitionClass} ${getVariants()} ${
        props.className
      }`}
      disabled={isLoading || props.disabled}
    >
      {isLoading && (
        <div className="absolute bg-black z-20 bg-opacity-20 h-full w-full left-0 top-0 flex items-center rounded-lg justify-center">
          <ComponentLoader size={15} />
        </div>
      )}
      {props.children}
    </button>
  );
}
