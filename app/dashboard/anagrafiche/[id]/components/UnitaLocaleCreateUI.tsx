"use client";
import React, {useActionState} from 'react';
import AnagraficheForm from "./AnagraficheForm"
import IconB from '../../../../../components/IconB';
import AnagraficheServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { Anagrafica } from '@prisma/client';
import { use } from 'react';
import FormAction from '../../../../../components/FormAction';

interface AnagraficheFormProps {
  dbResult?: Promise<Partial<Anagrafica>> 
}

const AnagraficheCreateUI: React.FC<AnagraficheFormProps> = ({ dbResult }) => {
  const [state, formAction, pending] = useActionState(AnagraficheServerAction, {message: ''});
  let anagrafica = undefined;
  if(dbResult) {
    let anagrafica = use(dbResult)
  }
  return (
    <form action={formAction}>
      {anagrafica ? <FormAction update/> : <FormAction create/>}
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <AnagraficheForm anagrafica={anagrafica}/>
      <ConditionalHider hidden={pending}>
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            {anagrafica ? 'Salva modifiche' : 'Salva nuovo'}
          </button>
        </center>
      </ConditionalHider>
    </form>
  );
};

export default AnagraficheCreateUI;