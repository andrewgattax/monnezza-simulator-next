import React from 'react';
import IconB from './IconB';

type Props = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean
  required?: boolean;
  value?: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFloating = ({type, name, label, required, value, onChange, disabled, readonly}: Props) => {
  const id = "itt_" + name.replace(/\s+/g, '-').toLowerCase();
  return (
      <div className="form-floating">
        <input type={type} className="form-control" 
          name={name} id={id} required={required} disabled={disabled} 
          value={value} onChange={onChange} readOnly={readonly} />
        <label htmlFor={id}> {label} </label>
      </div>
  );
}

export default InputFloating;