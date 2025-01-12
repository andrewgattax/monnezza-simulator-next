"use client";
import React, {useActionState} from 'react';
import LuogoProduzioneForm from './LuogoProduzioneForm';
import IconB from '../../../../../components/IconB';
import luogoProduzioneServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { LuogoProduzione } from '@prisma/client';
import { use } from 'react';
import FormAction from '../../../../../components/FormAction';

interface LuogoProduzioneFormProps {
  dbResult?: Promise<Partial<LuogoProduzione>>;
}

const LuogoProduzioneCreateUI: React.FC<LuogoProduzioneFormProps> = ({ dbResult }) => {
  const [state, formAction, pending] = useActionState(luogoProduzioneServerAction, {message: ''});
  let luogoProduzione = undefined;
  if(dbResult) {
    let luogoProduzione = use(dbResult)
  }
  return (
    <form action={formAction}>
      {luogoProduzione ? <FormAction update/> : <FormAction create/>}
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <LuogoProduzioneForm luogoProduzione={luogoProduzione}/>
      <ConditionalHider hidden={pending}>
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            {luogoProduzione ? 'Salva modifiche' : 'Salva nuovo'}
          </button>
        </center>
      </ConditionalHider>
    </form>
  );
};

export default LuogoProduzioneCreateUI;