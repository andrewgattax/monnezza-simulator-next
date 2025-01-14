import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni, { SelettoreComuniData } from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { UnitaLocale } from '@prisma/client';
import SelettoreAttivita from '../../../../../components/SelettoreAttivita';
import SelettoreComuniFormComponent from '../../../../../components/SelettoreComuniFormComponent';

interface UnitaLocaleFormProps {
  unitaLocale?: Partial<UnitaLocale>;
  onChange: (updatedData: any) => void;
}

const UnitaLocaleForm: React.FC<UnitaLocaleFormProps> = ({ unitaLocale, onChange }) => {
  const [formValues, setFormValues] = useState(unitaLocale || {});
  const [selettoreData, setSelettoreData] = useState<SelettoreComuniData | undefined>(undefined);

  useEffect(() => {
    setFormValues(unitaLocale || {});
  }, [unitaLocale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

    const handleSelettoreChange = (updatedData: SelettoreComuniData) => {
      console.log(updatedData);
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


  return (
    <div>
      <Accordion accordionId='unitaLocale'>
        <AccordionItem parentId='unitaLocale' title='Unita Locale' isShown>
          <div className="row g-2 mt-3">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Nome Luogo' type='text' required value={formValues.nome || ""}/>
            </div>
            <div className='col-4 my-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required value={formValues.indirizzo || ""} />
            </div>
            <div className='col-2 my-0'>
              <InputFloating name='n_civico' label='Civico' type='text' required value={formValues.n_civico || ""} />
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
          <div className="mt-2">
          </div>
          <div className="mt-2">
          {
            //TODO: SELETTORE ATTIVITA
          }
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default UnitaLocaleForm;
