import React from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { UnitaLocale } from '@prisma/client';
import SelettoreAttivita from '../../../../../components/SelettoreAttivita';

interface UnitaLocaleFormProps {
  unitaLocale?: Partial<UnitaLocale>;
}

const UnitaLocaleForm: React.FC<UnitaLocaleFormProps> = ({ unitaLocale: UnitaLocale }) => {
  return (
    <div>
      <Accordion accordionId='unitaLocale'>
        <AccordionItem parentId='unitaLocale' title='Unita Locale' isShown>
          <div className="row g-2 mt-3">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Nome Luogo' type='text' required />
            </div>
            <div className='col-4 my-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required />
            </div>
            <div className='col-2 my-0'>
              <InputFloating name='civico' label='Civico' type='text' required />
            </div>
          </div>
          <div className="mt-2">
            <SelettoreComuni />
          </div>
          <div className="mt-2">
            <SelettoreAttivita />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default UnitaLocaleForm;
