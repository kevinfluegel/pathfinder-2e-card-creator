import { ChangeEvent, useCallback, useMemo } from "react";

export interface CheckboxProps {
  name: string;
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

export const Checkbox = ({ name, value, label, onChange }: CheckboxProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={name}
          name={name}
          checked={value}
          type="checkbox"
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
  );
};
