import React from 'react';
import Accordion from '../../../../../components/Accordion';
import AccordionItem from '../../../../../components/AccordionItem';
import SelettoreComuni from '../../../../../components/SelettoreComuni';
import InputFloating from '../../../../../components/InputFloating';
import { LuogoProduzione } from '@prisma/client';

interface LuogoProduzioneFormProps {
  luogoProduzione?: Partial<LuogoProduzione>;
}

const LuogoProduzioneForm: React.FC<LuogoProduzioneFormProps> = ({ luogoProduzione }) => {
  return (
    <div>
      <Accordion accordionId='luogoProduzione'>
        <AccordionItem parentId='luogoProduzione' title='Luogo di produzione' isShown>
          <div className="row g-2 mt-3">
            <div className='col-6 mt-0'>
              <InputFloating name='nome' label='Nome Luogo' type='text' required />
            </div>
            <div className='col-4 mt-0'>
              <InputFloating name='indirizzo' label='Indirizzo' type='text' required />
            </div>
            <div className='col-2 mt-0'>
              <InputFloating name='civico' label='Civico' type='text' required />
            </div>
          </div>
          <SelettoreComuni />
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LuogoProduzioneForm;
