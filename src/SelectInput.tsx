import { Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Label } from "./Label";

interface SelectInputProps {
  colSpan: number;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  renderItem: (value: string) => ReactNode;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const SelectInput = ({
  colSpan,
  label,
  value,
  onChange,
  options,
  renderItem,
}: SelectInputProps) => {
  return (
    <div className={`col-span-6 sm:col-span-${colSpan}`}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label as={Label} htmlFor={""}>
              {label}
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="mt-1 h-9 py-2 px-3 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate text-left">
                  {renderItem(value)}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 pl-0 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {renderItem(option)}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
