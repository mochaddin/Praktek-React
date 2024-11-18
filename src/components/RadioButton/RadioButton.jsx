import React, { useState } from 'react';

export default function RadioButton({ options, defaultValue, onChange }) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleSelectionChange = (value) => {
    setSelected(value);
    onChange(value); // Call onChange prop to update the parent component
  };

  return (
    <div className="flex gap-6">
      {options.map((option, index) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer gap-3 inline-flex transition-all duration-200 hover:scale-105"
        >
          <input
            type="radio"
            name="customRadio"
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleSelectionChange(option.value)}
            className="hidden"
          />
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
              selected === option.value
                ? 'bg-[#6173E6] border-[#6173E6]'
                : 'border-[#D1D1D1] hover:border-[#6173E6]'
            }`}
            style={{ width: '20px', height: '20px' }}
          >
            {selected === option.value && (
              <span className="w-3 h-3 bg-[#6173E6] rounded-full"></span>
            )}
          </span>
          <span
            className={`ml-3 text-lg font-medium transition-all duration-200 ${
              selected === option.value ? 'text-[#081116]' : 'text-[#656666]'
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
