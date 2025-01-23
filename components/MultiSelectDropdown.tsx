import React, { useState } from 'react';

type MultiSelectProps = {
    name: string;
    label: string;
    disabled?: boolean
    required?: boolean;
    value: string[];
    readonly?: boolean;
    defaultValue?: string;
    info?: string
    options: {
        value: string,
        label: string;
    }[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function MultiSelectDropdown({ name, label, disabled, required, value, readonly, defaultValue, info, onChange, options }: MultiSelectProps) {

    return (
        <div className="form-floating">
            <div className="dropdown">
                <button
                    className="btn btn-secondary multi-select-button dropdown-toggle w-100 py-3 text-start"
                    type="button"
                    id="multiSelectDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={disabled}
                >
                    {value.length > 0
                        ? `Selezionati: ${value.join(', ')}`
                        : 'Seleziona ' + label}
                </button>
                <ul className="dropdown-menu" aria-labelledby="multiSelectDropdown">
                    {options.map((option) => (
                        <li key={option.value} className="dropdown-item">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    value={option.value}
                                    checked={value.includes(option.value)}
                                    onChange={onChange}
                                    disabled={readonly}
                                />
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
                {info && <small className="form-text text-muted">{info}</small>}
            </div>
        </div>
    );
}

export default MultiSelectDropdown;
