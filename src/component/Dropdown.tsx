/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export interface jsonType {
  name: string;
  id: number;
}
export interface dataType {
  options: Array<jsonType>;
  name: string;
  propmt: string;
  inputId: string;
  onChange: any
  width: string
  defaultValue: string
}

export default function Dropdown(
  { options,
    propmt,
    name,
    inputId,
    onChange,
    width,
    defaultValue
  }: dataType) {

  return (
    <div className={`dropdown ${width}`}>
      <input
        type='text'
        list={name}
        name={name}
        id={inputId}
        placeholder={propmt}
        className='w-100 input datalist'
        onChange={onChange}
        autoComplete='off'
        defaultValue={defaultValue}
      />
      <datalist id={name}>
        {options.map((option: jsonType) => (
          <option
            key={option.id}
          >
            {option.name}</option>
        ))}
      </datalist>
    </div >
  )
}