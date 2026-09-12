import { type ButtonHTMLAttributes, forwardRef } from "react";
import { button, type ButtonVariants } from "./button.variants";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, size, fullWidth, icon, children, ...rest }, ref) => {
    // Destructure the slot classnames from the variant config
    const { base, icon: iconSlot, label } = button({ color, size, fullWidth });

    return (
      <button ref={ref} className={base({ class: className })} {...rest}>
        {icon && <span className={iconSlot()}>{icon}</span>}
        <span className={label()}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
