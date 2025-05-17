import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
