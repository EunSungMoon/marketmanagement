/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

interface labelIp {
  use: string;
  labelName: string;
  ratio:string
}

interface inputIp {
  id: string;
  propmt: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onchange: any;
  width: string;
}

export function Label({ use, labelName, ratio }: labelIp) {
  return (
    <label
      htmlFor={use}
      className={`${ratio} label-ratio word-break`}
    >
      {labelName}
    </label >
  )
}

export function Input({ id, propmt, name, onchange, width }: inputIp) {
  return (
    <input
      type='text'
      id={id}
      name={name}
      className={`${width} input`}
      placeholder={propmt}
      onChange={onchange}
      autoComplete='off'
    />
  )
}
