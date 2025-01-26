import React from 'react';
import IconB from './IconB';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  iconName: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWithIcon = ({type, name, placeholder, iconName, required, value, onChange, className}: Props) => {
  return (
    <div className={className ? className : "mb-3"}>
      <div className="input-group">
        <span className="input-group-text">
          <IconB iconName={iconName} hasPadding={false} />
        </span>
        <input type={type} className="form-control" name={name} id={name} 
        placeholder={placeholder} required={required} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export default InputWithIcon;
