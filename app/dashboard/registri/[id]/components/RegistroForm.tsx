import React, { useState } from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { Registro } from '@prisma/client';
import SelettoreAttivita from '../../../../../components/SelettoreAttivita';
import InputCheckbox from '../../../../../components/InputCheckbox';

interface RegistroFormProps {
  registro?: Partial<Registro>;
}

const RegistroForm: React.FC<RegistroFormProps> = ({ registro }) => {
  const addAttivita = () => {
    setAttivitaList([...attivitaList, { id: counter, component: <SelettoreAttivita key={counter} onActivitySelected={addAttivita} /> }]);
    setCounter(counter + 1);
  };

  const [attivitaList, setAttivitaList] = useState([{ id: 0, component: <SelettoreAttivita key={0} onActivitySelected={addAttivita} /> }]);
  const [counter, setCounter] = useState(1);

  return (
    <div>
      <Accordion accordionId='registrogay'>
        <AccordionItem parentId='registrogay' title='Registro' isShown>
          <div className="row g-2 mt-3">
            <div className='col-8 mt-0'>
              <InputFloating name='descrizione' label='Descrizione Registro' type='text' required />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='nProgressivo' label='Progressivo di Inizio' type='number' />
            </div>
          </div>
          {attivitaList.map((attivita) => (
            <div className="row g-2 mt-2" key={attivita.id}>
              <div className="col-12">
                {attivita.component}
              </div>
            </div>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default RegistroForm;
