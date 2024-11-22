import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface AdditionalInputProps {
  error?: string;
  variant?: 'dark' | 'default';
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & AdditionalInputProps
>(({ className, error, type, variant = 'default', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-grayText disabled:cursor-not-allowed disabled:opacity-50',
        error ? '!border-2 !border-red-500' : '',
        variant === 'dark'
          ? 'bg-blackShade'
          : 'border border-border bg-transparent',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };