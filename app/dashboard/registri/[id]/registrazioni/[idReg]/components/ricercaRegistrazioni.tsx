"use client"

import React from 'react';
import EERSelectorFormComponent from '../../../../../../../components/EERSelectorFormComponent';
import { CodiceEER } from '../../../../../../../components/EERSelectorModal';
import { useRouter } from 'next/navigation';
import InputFloating from '../../../../../../../components/InputFloating';
import { AttivitaENUM } from '@prisma/client';
import { enumToName } from '../../../../../../../utils';

interface RicercaRegistrazioniProps {
    dataEER?: string;
    tipiAttivita?: AttivitaENUM[];
    selectedAttivita?: AttivitaENUM;
    trasmessa?: string;
    dataInizio?: string;
    dataFine?: string;
}

const RicercaRegistrazioni: React.FC<RicercaRegistrazioniProps> = ({ dataEER, tipiAttivita, selectedAttivita, trasmessa, dataInizio, dataFine }) => {
    const router = useRouter();

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    const handleEERChange = (d: CodiceEER) => {
        updateQueryParams('cEER', d.codice.toString());
    };

    const handleTipoAttivitaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQueryParams('TA', e.target.value);
    };

    const handleTrasmissioneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQueryParams('Tr', e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQueryParams(e.target.name, e.target.value);
    }

    return (
        <div>
            <div className="row g-2">
                <div className="col">
                    <EERSelectorFormComponent onChange={handleEERChange} data={dataEER} key={dataEER} />
                </div>
                <div className="col">
                    <div className="form-floating">
                        <select className="form-select" id="tipoAttivita" value={selectedAttivita ? selectedAttivita : ""} onChange={handleTipoAttivitaChange}>
                            <option value="">
                                Tutte
                            </option>
                            {tipiAttivita?.map((attivita) => (
                                <option key={attivita} value={attivita}>
                                    {enumToName(attivita)}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="tipoAttivita">Tipo Attività</label>
                    </div>
                </div>
            </div>
            <div className="row g-2 mt-1">
                <div className="col-3">
                    <InputFloating type='date' label='Da' name='dI' onChange={handleDateChange} value={dataInizio ? dataInizio : ""} />
                </div>
                <div className="col-3">
                    <InputFloating type='date' label='A' name='dF' onChange={handleDateChange} value={dataFine ? dataFine : ""} />
                </div>
                <div className="col">
                    <div className="form-floating">
                        <select className="form-select" id="trasmessaSelect" value={trasmessa ? trasmessa : ""} onChange={handleTrasmissioneChange}>
                            <option value="">Tutte</option>
                            <option value="trasmessa">Trasmessa</option>
                            <option value="nonTrasmessa">Non trasmessa</option>
                        </select>
                        <label htmlFor="trasmessaSelect">Stato di trasmissione</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RicercaRegistrazioni;