import React from 'react';
import InputCheckbox from '../InputCheckbox';
import { Registro, TipoAttivita } from '@prisma/client';
import { enumToName } from '../../utils';

interface SelettoreAttivitaMenoGayProps {
    listaAttivita: TipoAttivita[];
    formValues: Partial<Registro>;
    setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const SelettoreAttivitaMenoGay: React.FC<SelettoreAttivitaMenoGayProps> = ({ formValues, setFormValues, listaAttivita }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormValues((prevValues: Partial<Registro>) => {
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
            <p className='bordoTitolo mb-2'>Seleziona tipi attività</p>
            <div className='row g-2 bordofigo'>
                {listaAttivita.map((comba) => (
                    <div className="col mb-2" key={comba.attivita}>
                        <div>
                            <InputCheckbox
                                label={enumToName(comba.attivita)}
                                name={comba.attivita}
                                checked={formValues.tipiAttivita?.some((t) => t.attivita === comba.attivita) || false}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelettoreAttivitaMenoGay;