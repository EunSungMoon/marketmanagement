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
  onChange: any;
  width: string;
  defaultValue: string;
}

export interface selectDataType {
  options: Array<jsonType>;
  name: string;
  inputId: string;
  onChange: any;
  width: string;
  defaultValue: string;
}

export function Dropdown({ options, propmt, name, inputId, onChange, width, defaultValue }: dataType) {
  return (
    <div className={`dropdown ${width}`}>
      <input
        type="text"
        list={name}
        name={name}
        id={inputId}
        placeholder={propmt}
        className="w-100 input datalist"
        onChange={onChange}
        autoComplete="off"
        defaultValue={defaultValue}
      />
      <datalist id={name}>
        {options.map((option: jsonType) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </datalist>
    </div>
  );
}

export function SelectBox({ options, name, inputId, onChange, width, defaultValue }: selectDataType) {
  return (
    <div className={`dropdown ${width}`}>
      <select id={inputId} onChange={onChange} name={name} defaultValue={defaultValue} className="w-100 input datalist">
        <option value={defaultValue} disabled hidden>
          {defaultValue}
        </option>
        {options.map((option: jsonType) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export function SelectBox2({ options, name, inputId, onChange, width, defaultValue }: selectDataType) {
  return (
    <div className={`dropdown ${width}`}>
      <select id={inputId} onChange={onChange} name={name} className="w-100 input datalist">
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option: jsonType) => (
          <option key={option.id} disabled={option.name === defaultValue} hidden={option.name === defaultValue}>
            {option.name}
          </option>
        ))}
        ~
      </select>
    </div>
  );
}
