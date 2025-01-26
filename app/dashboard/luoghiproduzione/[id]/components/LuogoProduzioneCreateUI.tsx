"use client";
import React, {useActionState} from 'react';
import LuogoProduzioneForm from './LuogoProduzioneForm';
import IconB from '../../../../../components/IconB';
import luogoProduzioneServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ObjectId from '../../../../../components/ObjectId';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { LuogoProduzione } from '@prisma/client';
import { use, useState, useEffect } from 'react';
import FormAction from '../../../../../components/FormAction';
import { CodificheStatiResponse, CodificheComuniResponse } from '../../../../../rentri';

interface LuogoProduzioneFormProps {
  comuniPromise: Promise<CodificheComuniResponse[]>;
  statiPromise: Promise<CodificheStatiResponse[]>;
  dbResult?: Promise<Partial<LuogoProduzione>>;
  objectId?: string;
}

const LuogoProduzioneCreateUI: React.FC<LuogoProduzioneFormProps> = ({ dbResult, objectId, comuniPromise, statiPromise }) => {
  const [state, formAction, pending] = useActionState(luogoProduzioneServerAction, {message: ''});
  const initialFormData = dbResult ? use(dbResult) : {};
  const comuniResponse = use(comuniPromise);
  const statiResponse = use(statiPromise);
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (updatedData: any) => {
    setFormData(updatedData); // Keep track of form changes
  };

  useEffect(() => {
    setFormData(formData); // dovrebbe forzare un re-render??
  }, [state]);

  return (
    <form action={formAction}>
      {dbResult ? <FormAction update/> : <FormAction create/>}
      <ObjectId objectId={objectId} />
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <LuogoProduzioneForm 
        luogoProduzione={formData} 
        onChange={handleFormChange}
        comuni={comuniResponse}
        stati={statiResponse}
      />
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

export default LuogoProduzioneCreateUI;