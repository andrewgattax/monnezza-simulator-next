import React, { FC, useState } from 'react';
import SelettoreComuni, { SelettoreComuniData } from './SelettoreComuni';
import IconB from './IconB';
import {toast} from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: SelettoreComuniData | undefined) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [value, setValue] = useState<SelettoreComuniData | undefined>(undefined);

  const handleChange = (data: SelettoreComuniData) => {
    setValue(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = () => {
    console.log(value);
    if (value?.cap && value?.country) {
      if(value?.comune && value?.province && value?.region) {
        onSave(value);
        onClose();
      } else if(value?.comuneText && value?.provinceText && value?.regionText) {
        onSave(value);
        onClose();
      } else {
        toast.error('Per favore, compila tutti i campi');
      }
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
            <h5 className="modal-title">Seleziona comune</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>
          <div className="modal-body">
            <SelettoreComuni onChange={handleChange} />
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
