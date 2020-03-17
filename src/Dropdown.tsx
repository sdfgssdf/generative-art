import React, { useState, useContext } from "react";
const Dropdown = ({
  label,
  value,
  options,
  handleChange,
  name,
  disabled
}: any) => {
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  return (
    <label htmlFor={id}>
      {label}
      <select
        name={name}
        id={id}
        value={value}
        onChange={e => handleChange(e)}
        disabled={disabled}
      >
        {options.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
