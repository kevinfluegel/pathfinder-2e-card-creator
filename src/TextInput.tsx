import { Label } from "./Label";
import { ChangeEvent, useCallback } from "react";

interface TextInputProps {
  colSpan: number;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}

export const TextInput = ({
  colSpan,
  label,
  name,
  value,
  onChange,
}: TextInputProps) => {
  const valueChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={`col-span-6 sm:col-span-${colSpan}`}>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="text"
        name={name}
        id={name}
        className="mt-1 h-10 py-2 px-3 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={valueChanged}
      />
    </div>
  );
};
