import React, { useEffect, useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import InputFloating from '../../../../../components/InputFloating';
import { Registro, UnitaLocale } from '@prisma/client';
import SelettoreAttivitaMenoGay from '../../../../../components/SelettoreAttivitaMenoGay';

interface RegistroFormProps {
  isUpdating: boolean
  unitaLocali: UnitaLocale[]
  registro?: Partial<Registro>;
  onChange: (updatedData: any) => void;
}

const RegistroForm: React.FC<RegistroFormProps> = ({ registro, onChange, unitaLocali, isUpdating }) => {
  const [formValues, setFormValues] = useState(registro || {});
  const [selectedUnitaLocale, setSelectedUnitaLocale] = useState(unitaLocali[0])

  useEffect(() => {
    setFormValues(registro || {});
  }, [registro]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formValues, [name]: value };
    setFormValues(updatedData);
    onChange(updatedData);
  };

  const handleChangeUnitaLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedUnita = unitaLocali.find((ul) => ul.id === selectedId);
    setSelectedUnitaLocale(selectedUnita!);
    handleChange(e);
  }

  useEffect(() => {
    onChange(formValues);
  }, [formValues])

  return (
    <div>
      <Accordion accordionId='registrogay'>
        <AccordionItem parentId='registrogay' title='Registro' isShown>
          <div className="row g-2 mt-3">
            <div className="col-4 mt-0">
              <div className="form-floating">
                <select className='form-select' id='selectUnitaLocale' name="unitaLocaleId" value={selectedUnitaLocale.id} onChange={handleChangeUnitaLocale} disabled={isUpdating}>
                  {unitaLocali.map((unitaLocale) => (
                    <option key={unitaLocale.id} value={unitaLocale.id}>
                      {unitaLocale.nome}
                    </option>
                  ))}
                </select>
                <label htmlFor="selectUnitaLocale">Seleziona Unita Locale</label>
              </div>
              <input type='hidden' value={selectedUnitaLocale.id} name='unitaLocaleId' disabled={!isUpdating} />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='descrizione' label='Descrizione Registro' type='text' required value={formValues.descrizione} onChange={handleChange} />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='progressivoCounter' label='Progressivo di Inizio' type='number' value={formValues.progressivoCounter?.toString()} onChange={handleChange} />
            </div>
          </div>
          <SelettoreAttivitaMenoGay formValues={formValues} listaAttivita={selectedUnitaLocale.tipiAttivita} setFormValues={setFormValues} />
          <input type="hidden" name="tipiAttivitaJSON" defaultValue={JSON.stringify(formValues.tipiAttivita || [])} />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

//TODO: AGGIUNGERE SELETTORE ATTIVITA

export default RegistroForm;
