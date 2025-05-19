import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, fullWidth = true, className = '', ...props }, ref) => {
    const inputClasses = `
      block px-4 py-2 bg-white border rounded-md shadow-sm placeholder-neutral-400
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      ${error ? 'border-error-500' : 'border-neutral-300'}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;