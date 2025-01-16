"use client";
import React, { useState, useEffect } from 'react';
import EERSelectorModal, { CodiceEER } from './EERSelectorModal'; 
import InputFloating from './InputFloating';
import eerDB from "../codiceEERDb.json";
import IconB from './IconB';

interface EERSelectorFormComponentProps {
  data?: string;
  onChange?: (data: CodiceEER) => void;
}

const getCodiceEERFromJson = (code: string): CodiceEER | undefined => {
  return eerDB.find((item: CodiceEER) => item.codice === code);
};

const codiceEERVuoto = {
  codice: "",
  descrizione: ""
};

const EERSelectorFormComponent: React.FC<EERSelectorFormComponentProps> = ({ data, onChange }) => {
  const [selectedData, setSelectedData] = useState<CodiceEER | undefined>(
    data ? getCodiceEERFromJson(data) :
    codiceEERVuoto
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedData(
      getCodiceEERFromJson(data!)
    );
  }, [data]);

  const handleModalSave = (values: CodiceEER | undefined) => {
    if (values) {
      setSelectedData(values);
      if (onChange) {
        onChange(values);
      }
    }
  }

  return(
    <section>
      <input type='hidden' name='codiceEER' defaultValue={selectedData?.codice} />
      <div className="row mb-2 g-2">
        <div className='col'>
          <InputFloating
            type="text"
            name='codiceEER'
            label="Codice EER"
            defaultValue={
              selectedData ?
              `${selectedData?.codice} - ${selectedData?.descrizione}` :
              ""
            } // readonly
            readonly
          />
        </div>
        <div className='col col-auto'>
          <button type="button" className='btn btn-secondary px-4 w-100 h-100' onClick={() => setModalOpen(true)}>
            <IconB iconName="search" hasPadding={false}/>
          </button>
        </div>
      </div>
      <EERSelectorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />
    </section>
  );
}

export default EERSelectorFormComponent;