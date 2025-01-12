import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import InputFloating from '../../../../../components/InputFloating';
import { LuogoProduzione } from '@prisma/client';
import InputCheckbox from '../../../../../components/InputCheckbox';

interface LuogoProduzioneFormProps {
  luogoProduzione?: Partial<LuogoProduzione>;
  onChange: (updatedData: any) => void;
}

const LuogoProduzioneForm: React.FC<LuogoProduzioneFormProps> = ({ luogoProduzione, onChange }) => {
  const [formValues, setFormValues] = useState(luogoProduzione || {});

  useEffect(() => {
    setFormValues(luogoProduzione || {});
  }, [luogoProduzione]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

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
          <div className="row g-2 mt-2 mb-3">
            <div className='col-3 mt-0'>
              <InputFloating name='comune' label='Comune' type='text' required
                value={formValues.comune || ''} onChange={handleChange} />
            </div>
            <div className='col-2 mt-0'>
              <InputFloating name='provincia' label='Provincia' type='text' required
                value={formValues.provincia || ''} onChange={handleChange} />
            </div>
            <div className='col-1 mt-0'>
              <InputFloating name='cap' label='CAP' type='text' required
                value={formValues.cap || ''} onChange={handleChange} />
            </div>
            <div className='col-3 mt-0'>
              <InputFloating name='regione' label='Regione' type='text' required
                value={formValues.regione || ''} onChange={handleChange} />
            </div>
            <div className='col-3 mt-0'>
              <InputFloating name='nazione' label='Nazione' type='text' required
                value={formValues.nazione || ''} onChange={handleChange} />
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LuogoProduzioneForm;
