import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import InputFloating from '../../../../../components/InputFloating';
import { LuogoProduzione } from '@prisma/client';
import InputCheckbox from '../../../../../components/InputCheckbox';
import SelettoreComuniFormComponent from '../../../../../components/SelettoreComuniFormComponent';
import { SelettoreComuniData } from '../../../../../components/SelettoreComuni';

interface LuogoProduzioneFormProps {
  luogoProduzione?: Partial<LuogoProduzione>;
  onChange: (updatedData: any) => void;
}

const LuogoProduzioneForm: React.FC<LuogoProduzioneFormProps> = ({ luogoProduzione, onChange }) => {
  const [formValues, setFormValues] = useState(luogoProduzione || {});
  const [selettoreData, setSelettoreData] = useState<SelettoreComuniData | undefined>(undefined);

  useEffect(() => {
    setFormValues(luogoProduzione || {});
  }, [luogoProduzione]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

  const handleSelettoreChange = (updatedData: SelettoreComuniData) => {
    setFormValues({
      ...formValues,
      cap: updatedData.cap || undefined,
      comune: updatedData.comune || undefined,
      provincia: updatedData.province || undefined,
      regione: updatedData.region || undefined,
      nazione: updatedData.country,
    });
  };

  useEffect(() => {
    onChange(formValues);
  }, [formValues])

  return  (
    <div>
      <Accordion accordionId='luogoProduzione'>
        <AccordionItem parentId='luogoProduzione' title='Luogo di produzione' isShown>
          <div className="row g-2 mt-3 mb-2">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Nome Luogo' type='text' required
                value={formValues.nome || ''} onChange={handleChange} />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required
                value={formValues.indirizzo || ''} onChange={handleChange} />
            </div>
            <div className='col-2 mt-0'>
              <InputFloating name='civico' label='Civico' type='text' required 
                value={formValues.civico || ''} onChange={handleChange}/>
            </div>
          </div>
          <SelettoreComuniFormComponent 
            data={
              {cap: formValues.cap || "",
              comune: formValues.comune || "",
              province: formValues.provincia || "",
              region: formValues.regione || "",
              country: formValues.nazione || "",
              }
            } 
            onChange={handleSelettoreChange} 
          />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LuogoProduzioneForm;
