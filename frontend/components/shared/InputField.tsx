import { getTransitionClass } from "@/core/helpers/helpers";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function InputField({ error = "", ...props }: InputFieldProps) {
  const getErrorClassName = () => {
    if (error) {
      return "border-red-400";
    }
    return "";
  };

  return (
    <div className="w-full h-full">
      <label className="block font-medium text-gray-100">
        {props["aria-label"]}
      </label>
      <div className="flex flex-col gap-1">
        <input
          {...props}
          className={`mt-1 block w-full px-3 py-2 border-2 ${getTransitionClass} border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            props.className
          } ${getErrorClassName()}`}
        />
        <span className="text-red-400 text-sm">{error}</span>
      </div>
    </div>
  );
}
