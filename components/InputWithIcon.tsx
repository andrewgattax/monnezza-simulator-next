import React from 'react';
import IconB from './IconB';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  iconName: string;
};

const InputWithIcon = ({type, name, placeholder, iconName, required}: Props) => {
  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text">
          <IconB iconName={iconName} hasPadding={false} />
        </span>
        <input type={type} className="form-control" name={name} id={name} placeholder={placeholder} required={required} />
      </div>
    </div>
  );
}

export default InputWithIcon;
