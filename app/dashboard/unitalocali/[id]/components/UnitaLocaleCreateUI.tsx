"use client";
import React, {useActionState} from 'react';
import UnitaLocaleForm from "./UnitaLocaleForm"
import IconB from '../../../../../components/IconB';
import UnitaLocaleServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { UnitaLocale } from '@prisma/client';
import { use } from 'react';
import FormAction from '../../../../../components/FormAction';

interface UnitaLocaleFormProps {
  dbResult?: Promise<Partial<UnitaLocale>>;
}

const UnitaLocaleCreateUI: React.FC<UnitaLocaleFormProps> = ({ dbResult }) => {
  const [state, formAction, pending] = useActionState(UnitaLocaleServerAction, {message: ''});
  let unitaLocale = undefined;
  if(dbResult) {
    let UnitaLocale = use(dbResult)
  }
  return (
    <form action={formAction}>
      {unitaLocale ? <FormAction update/> : <FormAction create/>}
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <UnitaLocaleForm unitaLocale={unitaLocale}/>
      <ConditionalHider hidden={pending}>
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            {unitaLocale ? 'Salva modifiche' : 'Salva nuovo'}
          </button>
        </center>
      </ConditionalHider>
    </form>
  );
};

export default UnitaLocaleCreateUI;