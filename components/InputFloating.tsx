import React from 'react';
import IconB from './IconB';

type Props = {
  type: string;
  name: string;
  label: string;
  required?: boolean;
};

const InputFloating = ({type, name, label, required}: Props) => {
  const id = "itt_" + name.replace(/\s+/g, '-').toLowerCase();
  return (
      <div className="form-floating">
        <input type={type} className="form-control" name={name} id={id} required={required} />
        <label htmlFor={id}> {label} </label>
      </div>
  );
}

export default InputFloating;