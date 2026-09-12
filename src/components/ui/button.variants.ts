import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    icon: "shrink-0",
    label: "truncate",
  },
  variants: {
    color: {
      primary: {
        base: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      },
      secondary: {
        base: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300",
      },
      danger: {
        base: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      },
      ghost: {
        base: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
      },
    },
    size: {
      sm: {
        base: "h-8 px-3 text-sm",
        icon: "h-4 w-4",
      },
      md: {
        base: "h-10 px-4 text-base",
        icon: "h-5 w-5",
      },
      lg: {
        base: "h-12 px-6 text-lg",
        icon: "h-6 w-6",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
  },
  compoundVariants: [
    {
      color: "ghost",
      size: "lg",
      class: {
        base: "font-semibold",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
