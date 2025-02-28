import React from 'react';
import IconB from './IconB';
import {Tooltip} from "react-tooltip";
import ConditionalHider from "./ConditionalHider";

type Props = {
  type: string;
  name: string;
  label: string;
  disabled?: boolean
  required?: boolean;
  value?: string;
  readonly?: boolean;
  defaultValue?: string;
  info?: string
  valid?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


const InputFloating = (
  {type, name, label, required,
    value, onChange, disabled,
    readonly, defaultValue,
    info, valid}: Props
) => {
  valid = true;
  const id = "itt_" + name.replace(/\s+/g, '-').toLowerCase();
  const className = "tt_" + name.replace(/\s+/g, '-').toLowerCase();
  return (
      <div>
        <div className="form-floating">
          <input type={type} className={className + " form-control" + (valid ? "" : " is-invalid")}
                 name={name} id={id} required={required} disabled={disabled}
                 value={value} onChange={onChange} readOnly={readonly} defaultValue={defaultValue}
          />
          <label htmlFor={id}>
            {label}
            {info ? (
              <IconB
                iconName="info-circle"
                flipMargin
              />
            ) : null}
          </label>
        </div>
        <ConditionalHider hidden={!info}>
          <Tooltip anchorSelect={"." + className} place="top-start">
            {info}
          </Tooltip>
        </ConditionalHider>
      </div>
  );
}

export default InputFloating;