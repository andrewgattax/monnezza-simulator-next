"use client";
import React, {useActionState, useEffect, useState} from 'react';
import UnitaLocaleForm from "./UnitaLocaleForm"
import IconB from '../../../../../components/IconB';
import unitaLocaleServerAction from '../action';
import DbLoading from '../../../../../components/DbLoading';
import ErrorMessage from '../../../../../components/ErrorMessage';
import ConditionalHider from '../../../../../components/ConditionalHider';
import { UnitaLocale } from '@prisma/client';
import { use } from 'react';
import FormAction from '../../../../../components/FormAction';
import ObjectId from '../../../../../components/ObjectId';

interface UnitaLocaleFormProps {
  dbResult?: Promise<Partial<UnitaLocale>>;
  objectId?: string;
}

const UnitaLocaleCreateUI: React.FC<UnitaLocaleFormProps> = ({ dbResult, objectId }) => {
  const [state, formAction, pending] = useActionState(unitaLocaleServerAction, {message: ''});
  const initialFormData = dbResult ? use(dbResult) : {};
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
      <ConditionalHider hidden={!state.message}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <UnitaLocaleForm unitaLocale={formData} onChange={handleFormChange}/>
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

export default UnitaLocaleCreateUI;