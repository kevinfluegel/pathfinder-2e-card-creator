import { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
}

export const Label = (props: LabelProps) => {
  return (
    <label
      {...props}
      className="block normal-case text-sm font-medium text-gray-700 text-pf"
    />
  );
};
