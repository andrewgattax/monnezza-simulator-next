"use client";
import React, {useActionState} from 'react';
import registroForm from './RegistroForm';
import IconB from '../../../../../components/IconB';
import registroServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { Registro } from '@prisma/client';
import { use } from 'react';
import FormAction from '../../../../../components/FormAction';
import RegistroForm from './RegistroForm';

interface RegistroFormProps {
  dbResult?: Promise<Partial<Registro>>;
}

const RegistroCreateUI: React.FC<RegistroFormProps> = ({ dbResult }) => {
  const [state, formAction, pending] = useActionState(registroServerAction, {message: ''});
  let registro = undefined;
  if(dbResult) {
    let registro = use(dbResult)
  }
  return (
    <form action={formAction}>
      {registro ? <FormAction update/> : <FormAction create/>}
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <RegistroForm registro={registro}/>
      <ConditionalHider hidden={pending}>
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            {registro ? 'Salva modifiche' : 'Salva nuovo'}
          </button>
        </center>
      </ConditionalHider>
    </form>
  );
};

export default RegistroCreateUI;