import React from 'react';

export function TextInput(props) {
  return (
    <input {...props} type="text" />
  )
}

export function SelectInput(props) {
  const { optionList, ...rest } = props

  return (
    <select {...rest}>
      {
        optionList.map(
          (option, index) => (
            <option value={option[0]} key={index}>{option[1]}</option>
          )
        )
      }
    </select>
  )
}
