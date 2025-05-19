import React, { forwardRef } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, helperText, error, fullWidth = true, className = '', ...props }, ref) => {
    const selectClasses = `
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
        <select ref={ref} className={selectClasses} {...props}>
          <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;