import React from 'react';
import styles from "../styles/Checkbox.module.css"

type Props = {
    name: string;
    label: string;
    disabled?: boolean
    required?: boolean;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCheckbox = ({ name, label, required, checked, onChange, disabled }: Props) => {
    const id = "itt_" + name.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className="form-floating">
            <div className={`form-control ${styles.sos}`}>
                <input className={styles.inputgay} type="checkbox" name={name} id={id} required={required} disabled={disabled} checked={checked} onChange={onChange} />
                <label htmlFor={id}> {label} </label>
            </div>
        </div>
    );
}

export default InputCheckbox;