import React from 'react';
import InputCheckbox from './InputCheckbox';
import { AttivitaENUM, UnitaLocale } from '@prisma/client';
import { enumToName } from '../utils';

interface SelettoreAttivitaGayProps {
    formValues: Partial<UnitaLocale>;
    setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const SelettoreAttivitaGay: React.FC<SelettoreAttivitaGayProps> = ({ formValues, setFormValues }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormValues((prevValues: Partial<UnitaLocale>) => {
            const updatedTipiAttivita = checked
                ? [...(prevValues.tipiAttivita || []), { attivita: name }]
                : (prevValues.tipiAttivita || []).filter((t) => t.attivita !== name);
            return {
                ...prevValues,
                tipiAttivita: updatedTipiAttivita,
            };
        });
    };

    return (
        <div>
            <p className='mt-3'>Seleziona tipi attività</p>
            <div className='row g-2 mt-1'>
                {Object.values(AttivitaENUM).map((attivita) => (
                    <div className="col" key={attivita}>
                        <div>
                            <InputCheckbox
                                label={enumToName(attivita)}
                                name={attivita}
                                checked={formValues.tipiAttivita?.some((t) => t.attivita === attivita) || false}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelettoreAttivitaGay;