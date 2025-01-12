"use client"
import React, { useState, ChangeEvent } from 'react';
import InputFloating from './InputFloating';
import { AttivitaENUM, CodiceAttivita } from '@prisma/client';
import { enumToName } from '../utils';


interface SelettoreAttivitaProps {
    onActivitySelected?: () => void;
}

const SelettoreAttivita: React.FC<SelettoreAttivitaProps> = ({ onActivitySelected }) => {
    const [selectedActivity, setSelectedActivity] = useState<AttivitaENUM | null>(null);
    const [selectedCodes, setSelectedCodes] = useState<CodiceAttivita[] | null>(null);

    const handleActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const attivita = Object.values(AttivitaENUM).find(activity => activity === e.target.value) || null;
        setSelectedActivity(attivita);
        if (attivita && onActivitySelected) {
            onActivitySelected();
        }
    }

    const handleCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const codici = Array.from(e.target.selectedOptions, option =>
            Object.values(CodiceAttivita).find(code => code === option.value)
        ).filter(code => code !== undefined) as CodiceAttivita[];
        setSelectedCodes(codici);
    }

    return (
        <div className="row g-2">
            <div className='col-8'>
                <div className="form-floating">
                    <select className="form-select" id="tipoAttivita" name='tipoAttivita' onChange={handleActivityChange} defaultValue="">
                        <option value="">Seleziona</option>
                        {Object.values(AttivitaENUM).map((activity) => (
                            <option key={activity} value={activity}>{enumToName(activity)}</option>
                        ))}
                    </select>
                    <label htmlFor="tipoAttivita">Tipo Attività: </label>
                </div>
            </div>
            <div className="col-4">
                <div className="form-floating">
                    <select className="form-select" id="codiceAttivita" name='codiceAttivita' multiple onChange={handleCodeChange} disabled={!selectedActivity}>
                        {Object.values(CodiceAttivita).map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                    <label htmlFor="codiceAttivita">Codici Attività: </label>
                </div>
            </div>
        </div>
    )
}

export default SelettoreAttivita;