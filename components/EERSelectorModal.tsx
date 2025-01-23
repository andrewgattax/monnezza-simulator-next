"use client";
import React, { FC, useState } from 'react';
import SelettoreComuni, { SelettoreComuniData } from './SelettoreComuni';
import IconB from './IconB';
import InputWithIcon from './InputWithIcon';
import { toast } from 'react-toastify';
import eerDB from "../codiceEERDb.json";
import Select, { ActionMeta, SingleValue } from 'react-select';

export interface CodiceEER {
  codice: string;
  descrizione: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: CodiceEER | undefined) => void;
}



const Modal: FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [value, setValue] = useState<CodiceEER | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  const filteredEERCodes = eerDB.filter((eer: CodiceEER) => {
    return eer.codice.includes(searchTerm) || eer.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
  }
    
  );

  const options = filteredEERCodes.map((eer: CodiceEER) => ({
    value: eer,
    label: `${eer.codice} - ${eer.descrizione}`
  }));

  const handleChange = (
    newValue: SingleValue<{ value: CodiceEER; label: string; }>, 
    actionMeta: ActionMeta<{ value: CodiceEER; label: string; }>
  ) => {
    setValue(newValue?.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = () => {
    if (value) {
      onSave(value);
      onClose();
    } else {
      toast.error('Per favore, compila tutti i campi');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block modal-xl modal-bg" onKeyDown={handleKeyDown}>
      <div className="modal-dialog mt-10">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleziona codice EER</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>
          <div className="modal-body">
            <InputWithIcon
              type="text"
              name='ricerca'
              iconName='search'
              placeholder="Cerca codice EER (es. 01_01_01)"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {
              //TODO: CAMPIONE DELLA PORCAGGINE ASSOLUTA
            }
            <Select
              options={options}
              placeholder="Seleziona dai risultati della ricerca"
              onChange={handleChange}
              value={value ? { value, label: `${value.codice} - ${value.descrizione}` } : null}
              isOptionDisabled={(option) => option.value.codice.includes("00_00")}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary px-3" onClick={onClose}>
              <span className="pr-1">
                <IconB iconName='backspace' />
              </span>
              Annulla
            </button>
            <button type="button" className="btn btn-primary btn-overcolor px-3" onClick={handleSave}>
              <span className="pr-1">
                <IconB iconName='floppy' />
              </span>
              Salva
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Modal;
