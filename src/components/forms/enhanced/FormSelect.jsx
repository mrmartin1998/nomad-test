import React, { useState, useRef, useEffect } from 'react';

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  searchable = false,
  icon,
  helpText,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  useEffect(() => {
    if (!searchable || !searchTerm) {
      setFilteredOptions(options);
      return;
    }

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options, searchable]);

  // Initialize filtered options when options change
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
    }
  }, [options, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSelect = (option) => {
    onChange({
      target: {
        name,
        value: option.value
      }
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedOption = options.find(option => option.value === value);

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

      {/* Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        {/* Select Button */}
        <button
          type="button"
          className={`input input-bordered w-full flex items-center justify-between transition-all duration-200 text-left
            ${icon ? 'pl-10' : ''}
            ${error ? 'input-error border-error' : ''}
            ${isOpen && !error ? 'border-primary ring-2 ring-primary/20' : ''}
            ${disabled ? 'input-disabled cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'}
            ${selectedOption ? 'input-success' : ''}
          `}
          onClick={handleToggle}
          disabled={disabled}
          {...props}
        >
          {/* Leading Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
              {icon}
            </div>
          )}

          {/* Selected Value or Placeholder */}
          <span className={selectedOption ? 'text-base-content' : 'text-base-content/50'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {/* Dropdown Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 text-base-content/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-base-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="input input-sm input-bordered w-full"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`w-full px-4 py-3 text-left hover:bg-base-200 transition-colors duration-150 flex items-center justify-between
                      ${option.value === value ? 'bg-primary/10 text-primary font-medium' : 'text-base-content'}
                    `}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-base-content/50 text-center">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              )}
            </div>
          </div>
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
      {selectedOption && !error && (
        <label className="label">
          <span className="label-text-alt text-success flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Selection confirmed
          </span>
        </label>
      )}
    </div>
  );
};

export default FormSelect; 