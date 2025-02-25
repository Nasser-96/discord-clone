import { getTransitionClass } from "@/core/helpers/helpers";
import { DirectionEnum } from "@/core/types&enums/enums";
import { JSX } from "react";

interface DropDownMenuButtonItemProps {
  label: string;
  className?: string;
  disabled?: boolean;
  dir?: DirectionEnum;
  icon?: JSX.Element;
  action?: () => void;
}

export default function DropDownMenuButtonItem({
  dir,
  disabled,
  className,
  label,
  icon,
  action,
}: DropDownMenuButtonItemProps) {
  return (
    <button
      className={`flex w-full items-center justify-start gap-2 p-2 text-sm bg-slate-200 dark:bg-slate-950 ${getTransitionClass} hover:!bg-opacity-50 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      type="button"
      disabled={disabled}
      dir={dir}
      onClick={action}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}
