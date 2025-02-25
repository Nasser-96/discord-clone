import { getTransitionClass } from "@/core/helpers/helpers";
import { useOutsideClick } from "@/core/hooks/useOutsideClick";
import { useRef, useState } from "react";

interface DropDownMenuProps {
  children: React.ReactNode;
  listChildren: React.ReactNode;
}

export default function DropDownMenu({
  children,
  listChildren,
}: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const closeDropDown = () => setIsOpen(false);

  useOutsideClick({
    isOpen: isOpen,
    ref: dropDownRef,
    callback: closeDropDown,
  });

  return (
    <div ref={dropDownRef} className="relative rounded-lg">
      <button
        type="button"
        title="drop-down-menu"
        className={`w-full bg-gray-200 dark:bg-slate-950 hover:bg-opacity-50 ${getTransitionClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </button>
      <div className="flex justify-center w-full mt-0 relative">
        <div
          className={`absolute top-1 dark:bg-gray-900 bg-gray-100 min-h-12 rounded-lg shadow drop-shadow ${getTransitionClass} w-[calc(100%-20px)]
        ${isOpen ? "scale-100" : "scale-0"}
          `}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          {listChildren}
        </div>
      </div>
    </div>
  );
}
