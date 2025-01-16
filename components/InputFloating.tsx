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
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFloating = ({type, name, label, required, value, onChange, disabled, readonly, defaultValue}: Props) => {
  const id = "itt_" + name.replace(/\s+/g, '-').toLowerCase();
  return (
      <div className="form-floating">
        <input type={type} className="form-control" 
          name={name} id={id} required={required} disabled={disabled} 
          value={value} onChange={onChange} readOnly={readonly} defaultValue={defaultValue}/>
        <label htmlFor={id}> {label} </label>
      </div>
  );
}

export default InputFloating;