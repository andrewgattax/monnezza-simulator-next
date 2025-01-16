"use client";
import React, {useActionState} from 'react';
import RegistrazioneForm from './RegistrazioneForm';
import { AttivitaENUM, Registrazione, TipoAttivita } from '@prisma/client';
import { use, useState, useEffect } from 'react';
import registrazioneServerAction from '../action';
import FormAction from '../../../../../../../components/FormAction';
import ObjectId from '../../../../../../../components/ObjectId';
import ConditionalHider from '../../../../../../../components/ConditionalHider';
import DbLoading from '../../../../../../../components/DbLoading';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import IconB from '../../../../../../../components/IconB';
import CustomObjectId from '../../../../../../../components/CustomObjectId';

interface RegistrazioneFormProps {
  dbResult?: Promise<Partial<Registrazione>>;
  tipiAttivita?: TipoAttivita[];
  objectId?: string,
  registroId: string
}

const RegistrazioneCreateUI: React.FC<RegistrazioneFormProps> = ({ dbResult, tipiAttivita, objectId, registroId }) => {
  const tipiAttivitaProva: TipoAttivita[] = [
    {
      attivita: AttivitaENUM.INTERMEDIAZIONE,
      codiciRifiuto: []
    },
    {
      attivita: AttivitaENUM.TRASPORTO,
      codiciRifiuto: []
    },
    {
      attivita: AttivitaENUM.RECUPERO,
      codiciRifiuto: []
    }
  ]
    
  
  const [state, formAction, pending] = useActionState(registrazioneServerAction, {message: ''});
  const initialFormData = dbResult ? use(dbResult) : {};
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (updatedData: any) => {
    console.log("DATI DAL FORM REGISTRAZIONE: ", updatedData)
    setFormData(updatedData); // Keep track of form changes
  };

  useEffect(() => {
    setFormData(formData); // dovrebbe forzare un re-render??
  }, [state]);

  return (
    <form action={formAction}>
      {dbResult ? <FormAction update/> : <FormAction create/>}
      <CustomObjectId nome='registroId' objectId={registroId} />
      <ObjectId objectId={objectId} />
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack/>
      </ConditionalHider>
      <RegistrazioneForm tipiAttività={tipiAttivitaProva} registrazione={formData} onChange={handleFormChange}/>
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