import { getTransitionClass } from "@/core/helpers/helpers";
import ComponentLoader from "./componentLoader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export default function Button({ isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`p-2 border dark:border-white border-black disabled:cursor-not-allowed ${getTransitionClass} rounded-lg text-black dark:text-white relative ${props.className}`}
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
