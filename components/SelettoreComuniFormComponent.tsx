import React, { useState, useEffect } from 'react';
import { SelettoreComuniData } from './SelettoreComuni'; // Adjust the path as necessary
import SelettoreComuniModal from './SelettoreComuniModal'; // Adjust the path as necessary
import InputFloating from './InputFloating';
import IconB from './IconB';

interface SelettoreComuniFormComponentProps {
  data?: SelettoreComuniData;
  onChange?: (data: SelettoreComuniData) => void;
}

const SelettoreComuniFormComponent: React.FC<SelettoreComuniFormComponentProps> = ({ data, onChange }) => {
  const [selectedData, setSelectedData] = useState<SelettoreComuniData>(data!);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedData(data!);
  }, [data]);

  const handleModalSave = (values: SelettoreComuniData | undefined) => {
    if (values) {
      setSelectedData(values);
      if (onChange) {
        onChange(values);
      }
    }
  };

  return (
    <div>
      <div className="row g-2">
        <div className="col col-3">
          <InputFloating disabled type="text" name="nazione" label="Nazione" value={selectedData?.country!} />
          <input type="hidden" name="nazione" value={selectedData?.country!} />
        </div>
        <div className="col col-3">
          <InputFloating disabled type="text" name="regione" label="Regione" value={selectedData?.region!} />
          <input type="hidden" name="regione" value={selectedData?.region!} />
        </div>
        <div className="col col-1">
          <InputFloating disabled type="text" name="provincia" label="Provincia" value={selectedData?.province!} />
          <input type="hidden" name="provincia" value={selectedData?.province!} />
        </div>
        <div className="col col-3">
          <InputFloating disabled type="text" name="comune" label="Comune" value={selectedData?.comune!} />
          <input type="hidden" name="comune" value={selectedData?.comune!} />
        </div>
        <div className="col col-1">
          <InputFloating disabled type="text" name="cap" label="Cap" value={selectedData?.cap!} />
          <input type="hidden" name="cap" value={selectedData?.cap!} />
        </div>
        <div className="col col-1">
          <button type='button' className='btn btn-secondary w-100 h-100' onClick={() => setModalOpen(true)}>
            <IconB iconName="search" />
          </button>
        </div>
      </div>
      <SelettoreComuniModal isOpen={isModalOpen} onSave={handleModalSave} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default SelettoreComuniFormComponent;
