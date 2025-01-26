"use client"

import React, { ChangeEvent, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { Anagrafica } from '@prisma/client';
import SelettoreAttivita from '../../../../../components/selettoreAttivita/SelettoreAttivita';
import countryData from "../../../../../countryDb.json";

interface AnagraficheFormProps {
  anagrafica?: Anagrafica
}

interface Country {
  name: string;
  code: string;
}



const AnagraficheForm: React.FC<AnagraficheFormProps> = ({ anagrafica: Anagrafica }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  }

  return (
    <div>
      <Accordion accordionId='anagrafiche'>
        <AccordionItem parentId='anagrafiche' title='Anagrafiche' isShown>
          <div className="row g-2 mt-3">
            <div className='col-3 mt-0'>
              <div className="form-floating">
                <select className="form-select" id="tipoAnagrafica" name='tipoAnagrafica' defaultValue="" onChange={handleTypeChange}>
                  <option value="" disabled>Seleziona</option>
                  <option key="produttore" value="PRODUTTORE">Produttore</option>
                  <option key="destinatario" value="DESTINATARIO">Destinatario</option>
                  <option key="intermediario" value="INTERMEDIARIO">Intermediario</option>
                  <option key="trasportatore" value="TRASPORTATORE">Trasportatore</option>
                </select>
                <label htmlFor="tipoAnagrafica">Tipo anagrafica: </label>
              </div>
            </div>
            <div className='col-3 my-0'>
              <InputFloating name='denominazione' label='Denominazione' type='text' required />
            </div>
            <div className='col-6 my-0'>
              <InputFloating name='codicefiscale' label='Codice Fiscale' type='text' required />
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-4">
              <InputFloating name="niscrizionealbo" type='text' label='Numero Iscrizione Albo' disabled = {(selectedType === "DESTINATARIO" || selectedType === "PRODUTTORE")}/>
            </div>
            <div className="col-4">
              <InputFloating name="nautorizzazione" type='text' label='Numero Autorizzazione' disabled= {!(selectedType === "DESTINATARIO")}/>
            </div>
            <div className="col-4">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="nazione"
                  name="nazione"
                  defaultValue="Italia"
                >
                  {countryData.map((country: Country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="region">Stato: </label>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default AnagraficheForm;
