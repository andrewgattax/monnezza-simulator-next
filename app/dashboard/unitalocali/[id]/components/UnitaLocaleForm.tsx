import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuniNuovo, { SelettoreComuniData } from '../../../../../components/SelettoreComuniNuovo';
import InputFloating from '../../../../../components/InputFloating';
import { UnitaLocale } from '@prisma/client';
import SelettoreComuniFormComponent from '../../../../../components/SelettoreComuniFormComponent';
import SelettoreAttivitaGay from '../../../../../components/selettoreAttivita/SelettoreAttivitaGay';
import {CodificheComuniResponse, CodificheStatiResponse, CodificheTipiAttivita} from '../../../../../rentri';

interface UnitaLocaleFormProps {
  tipiAttivita: CodificheTipiAttivita[],
  unitaLocale?: Partial<UnitaLocale>;
  comuni: CodificheComuniResponse[];
  stati: CodificheStatiResponse[];
  onChange: (updatedData: any) => void;
}

const UnitaLocaleForm: React.FC<UnitaLocaleFormProps> = ({ unitaLocale, onChange, tipiAttivita, comuni, stati }) => {
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
      setFormValues({
        ...formValues,
        cap: updatedData.cap || undefined,
        comune: updatedData.comune || undefined,
        provincia: updatedData.province || undefined,
        regione: updatedData.region || undefined,
        nazione: updatedData.country || undefined,
      });
    };

  useEffect(() => {
    onChange(formValues);
  }, [formValues])



  return (
    <div>
      <Accordion accordionId='unitaLocale'>
        <AccordionItem parentId='unitaLocale' title='Unita Locale' isShown>
          <div className="row g-2 mt-3 mb-2">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Ragione Sociale' type='text' required value={formValues.nome || ""} onChange={handleChange}/>
            </div>
            <div className='col-4 my-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required value={formValues.indirizzo || ""} onChange={handleChange}/>
            </div>
            <div className='col-2 my-0'>
              <InputFloating name='n_civico' label='Civico' type='text' required value={formValues.n_civico || ""} onChange={handleChange}/>
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
            comuni={comuni}
            stati={stati}
            onChange={handleSelettoreChange} 
          />
          <div className="mt-2">
          </div>
          <div className="mt-2">
          <SelettoreAttivitaGay tipiAttivita={tipiAttivita} formValues={formValues} setFormValues={setFormValues} />
          <input type="hidden" name="tipiAttivitaJSON" value={JSON.stringify(formValues.tipiAttivita || [])} />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default UnitaLocaleForm;
