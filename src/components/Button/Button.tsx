import { PropsWithChildren } from "react";

export type ButtonProps = {
  onClick?: () => void;
};

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <button {...props} className="p-3 rounded-lg text-white hover:bg-slate-700">
      {children}
    </button>
  );
};

export default Button;
