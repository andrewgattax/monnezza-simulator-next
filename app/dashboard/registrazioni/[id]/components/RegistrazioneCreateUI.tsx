"use client";
import React, {useActionState} from 'react';
import RegistrazioneForm from './RegistrazioneForm';
import IconB from '../../../../../components/IconB';
import RegistrazioneServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { Registrazione } from '@prisma/client';
import { use, useState, useEffect } from 'react';
import FormAction from '../../../../../components/FormAction';

interface RegistrazioneFormProps {
  dbResult?: Promise<Partial<Registrazione>>;
}

const RegistrazioneCreateUI: React.FC<RegistrazioneFormProps> = ({ dbResult }) => {
  const [state, formAction, pending] = useActionState(RegistrazioneServerAction, {message: ''});
  const [formData, setFormData] = useState(() => (dbResult ? use(dbResult) : {}));

  const handleFormChange = (updatedData: any) => {
    setFormData(updatedData); // Keep track of form changes
  };

  useEffect(() => {
    setFormData(formData); // dovrebbe forzare un re-render??
  }, [state]);

  return (
    <form action={formAction}>
      {dbResult ? <FormAction update/> : <FormAction create/>}
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <RegistrazioneForm registrazione={formData} onChange={handleFormChange}/>
      <ConditionalHider hidden={pending}>
        <center>
          <button className='btn btn-primary btn-overcolor px-3' type='submit'>
            <span className="pr-1">
              <IconB iconName='floppy' />
            </span>
            {dbResult ? 'Salva modifiche' : 'Salva nuovo'}
          </button>
        </center>
      </ConditionalHider>
    </form>
  );
};

export default RegistrazioneCreateUI;