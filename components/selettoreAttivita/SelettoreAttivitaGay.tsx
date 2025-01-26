import React from 'react';
import InputCheckbox from '../InputCheckbox';
import { UnitaLocale } from '@prisma/client';
import { enumToName } from '../../utils';
import { CodificheTipiAttivita } from '../../rentri';

interface SelettoreAttivitaGayProps {
    tipiAttivita: CodificheTipiAttivita[],
    formValues: Partial<UnitaLocale>;
    setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const SelettoreAttivitaGay: React.FC<SelettoreAttivitaGayProps> = ({ formValues, setFormValues, tipiAttivita }) => {
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
            <div className='bordoTitolo mb-2'>Seleziona tipi attività</div>
            <div className='row g-2 bordofigo'>
                {tipiAttivita.map((attivita) => (
                    <div className="col mb-2" key={attivita.id}>
                        <div>
                            <InputCheckbox
                                label={attivita.code}
                                name={attivita.code}
                                checked={formValues.tipiAttivita?.some((t) => t.attivita === attivita.code) || false}
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