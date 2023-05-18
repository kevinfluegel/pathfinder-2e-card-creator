import { Label } from "./Label";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface TextInputProps {
  colSpan: number;
  label: string;
  name: string;
  onChange: (v: string[]) => void;
  value: string[];
  asTags?: boolean;
  split?: string | RegExp;
}

export const MultipleInput = ({
  colSpan,
  label,
  name,
  onChange,
  asTags,
  value,
  split = /[\s,]+/,
}: TextInputProps) => {
  const [currentValue, setCurrentValue] = useState("");
  const [values, setValues] = useState<string[]>([]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
    },
    [setCurrentValue]
  );

  const remove = useCallback(
    (item: string) => () => {
      const filtered = values.filter((search) => search !== item);
      setValues(filtered);
      onChange(filtered);
    },
    [onChange, values]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      e.stopPropagation();
      e.preventDefault();
      const newValue = currentValue.split(split);
      setValues([...values, ...newValue]);
      setCurrentValue("");
      onChange([...values, ...newValue]);
    },
    [currentValue, onChange, split, values]
  );

  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <>
      <div className={`col-span-6 sm:col-span-${colSpan}`}>
        <Label htmlFor={name}>{label}</Label>
        <input
          type="text"
          name={name}
          id={name}
          className="mt-1 h-9 py-2 px-3 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={currentValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="col-span-4">
        {asTags ? (
          <div className="pf-traits">
            {values.map((item) => (
              <div key={item} className="pf-trait-border relative group text-black">
                <button
                  onClick={remove(item)}
                  className="absolute inset-0 z-10 invisible group-hover:visible group-hover:bg-neutral-800 flex justify-center text-black"
                >
                  <XCircleIcon
                    className="h-5 w-5 text-white m-auto"
                    aria-hidden="true"
                  />
                </button>
                <span className='pf-trait'>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {values.map((item) => (
              <li key={`${item}-li`} className="flex flex-row items-center">
                <button onClick={remove(item)} className="mr-4">
                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
