import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
        secondary: 'bg-white text-primary-500 border border-primary-200 hover:bg-primary-50 focus:ring-primary-500',
        outline: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500',
        ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500',
        destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm',
        default: 'h-11 px-6 py-3 text-sm',
        lg: 'h-12 px-8 py-4 text-base',
        xl: 'h-14 px-10 py-5 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };