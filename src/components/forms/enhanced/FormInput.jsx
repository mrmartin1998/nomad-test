import React, { useState } from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  icon,
  helpText,
  autoComplete,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`form-control w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="label" htmlFor={name}>
          <span className={`label-text font-medium ${required ? 'after:content-["*"] after:text-error after:ml-1' : ''}`}>
            {label}
          </span>
          {helpText && (
            <div className="tooltip tooltip-left" data-tip={helpText}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-base-content/50 hover:text-base-content cursor-help">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c0-1.035.84-1.875 1.875-1.875s1.875.84 1.875 1.875c0 .8-.5 1.485-1.2 1.76L12 10.5v1.5m0 3h.008v.008H12V15z" />
              </svg>
            </div>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Leading Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={inputType}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`input input-bordered w-full transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
            ${error ? 'input-error border-error focus:border-error' : ''}
            ${isFocused && !error ? 'border-primary ring-2 ring-primary/20' : ''}
            ${disabled ? 'input-disabled' : ''}
            ${value ? 'input-success' : ''}
          `}
          {...props}
        />

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <label className="label">
          <span className="label-text-alt text-error flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </span>
        </label>
      )}

      {/* Success Indicator */}
      {value && !error && (
        <label className="label">
          <span className="label-text-alt text-success flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Looks good!
          </span>
        </label>
      )}
    </div>
  );
};

export default FormInput; 