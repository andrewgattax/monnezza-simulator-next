import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import InputFloating from '../../../../../components/InputFloating';
import { Registro } from '@prisma/client';

interface RegistroFormProps {
  registro?: Partial<Registro>;
  onChange: (updatedData: any) => void;
}

const RegistroForm: React.FC<RegistroFormProps> = ({ registro, onChange }) => {
  const [formValues, setFormValues] = useState(registro || {});

  useEffect(() => {
    setFormValues(registro || {});
  }, [registro]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

   useEffect(() => {
      onChange(formValues);
    }, [formValues])

  return (
    <div>
      <Accordion accordionId='registrogay'>
        <AccordionItem parentId='registrogay' title='Registro' isShown>
          <div className="row g-2 mt-3">
            <div className='col-8 mt-0'>
              <InputFloating name='descrizione' label='Descrizione Registro' type='text' required value={formValues.descrizione} />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='nProgressivo' label='Progressivo di Inizio' type='number' value={formValues.progressivoCounter?.toString()}/>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

//TODO: AGGIUNGERE SELETTORE ATTIVITA

export default RegistroForm;
