"use client";
import React, { useActionState } from 'react';
import RegistrazioneForm from './RegistrazioneForm';
import { Registrazione, TipoAttivita } from '@prisma/client';
import { use, useState, useEffect } from 'react';
import registrazioneServerAction from '../action';
import FormAction from '../../../../../../../components/FormAction';
import ObjectId from '../../../../../../../components/ObjectId';
import ConditionalHider from '../../../../../../../components/ConditionalHider';
import DbLoading from '../../../../../../../components/DbLoading';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import IconB from '../../../../../../../components/IconB';
import CustomObjectId from '../../../../../../../components/CustomObjectId';
import { CodificheAttivitaDestinazione, CodificheCategorieAEE, CodificheCausaleRespingimento, CodifichePericoloRifiuto, CodificheProvenienzaRifiuto, CodificheStatoFisico, CodificheTipologiaRespingimento, CodificheTrans, CodificheUnitaMisura } from '../../../../../../../rentri';

interface RegistrazioneFormProps {
  dbResult?: Promise<Partial<Registrazione>>;
  causaliRespingimento: Promise<CodificheCausaleRespingimento[]>,
  pericoliRifiuto: Promise<CodifichePericoloRifiuto[]>,
  provenienzaRifiuto: Promise<CodificheProvenienzaRifiuto[]>,
  statiFisiciRifiuto: Promise<CodificheStatoFisico[]>,
  tipiRespingimento: Promise<CodificheTipologiaRespingimento[]>,
  tipiTrasportoTrans: Promise<CodificheTrans[]>,
  unitaDiMisura: Promise<CodificheUnitaMisura[]>,
  attivitaADestinazione: Promise<CodificheAttivitaDestinazione[]>,
  categorieAEE: Promise<CodificheCategorieAEE[]>,
  tipiAttivita: TipoAttivita[];
  progressivi?: String[]
  objectId?: string,
  registroId: string
}

const RegistrazioneCreateUI: React.FC<RegistrazioneFormProps> = ({ dbResult, progressivi, tipiAttivita, objectId, registroId, causaliRespingimento, attivitaADestinazione, pericoliRifiuto, provenienzaRifiuto,
  statiFisiciRifiuto, tipiRespingimento, tipiTrasportoTrans, unitaDiMisura, categorieAEE
 }) => {

  const [state, formAction, pending] = useActionState(registrazioneServerAction, { message: '' });
  const initialFormData = dbResult ? use(dbResult) : {};
  const [formData, setFormData] = useState(initialFormData);
  const resAttivitaADestinazione = use(attivitaADestinazione);
  const resCausaliRespingimento = use(causaliRespingimento);
  const resPericoliRifiuto = use(pericoliRifiuto);
  const resProvenienzaRifiuto = use(provenienzaRifiuto);
  const resStatiFisiciRifiuto = use(statiFisiciRifiuto);
  const resTipiRespingimento = use(tipiRespingimento);
  const resTipiTrasportoTrans = use(tipiTrasportoTrans);
  const resUnitaDiMisura = use(unitaDiMisura);
  const resCategoriaAEE = use(categorieAEE);

  const handleFormChange = (updatedData: any) => {
    setFormData(updatedData); // Keep track of form changes
  };

  useEffect(() => {
    setFormData(formData); // dovrebbe forzare un re-render??
  }, [state]);

  return (
    <form action={formAction}>
      {dbResult ? <FormAction update /> : <FormAction create />}
      <CustomObjectId nome='registroId' objectId={registroId} />
      <ObjectId objectId={objectId} />
      <ConditionalHider hidden={!pending}>
        <DbLoading />
      </ConditionalHider>
      <ConditionalHider hidden={!state.message || pending}>
        <ErrorMessage title='Errore nel salvataggio' message={state.message} noBack />
      </ConditionalHider>
      <RegistrazioneForm 
        tipiAttività={tipiAttivita} 
        registrazione={formData} 
        onChange={handleFormChange} 
        progressivi={progressivi} 
        attivitaADestinazione={resAttivitaADestinazione} 
        causaliRespingimento={resCausaliRespingimento}
        pericoliRifiuto={resPericoliRifiuto}
        provenienzaRifiuto={resProvenienzaRifiuto}
        statiFisiciRifiuto={resStatiFisiciRifiuto}
        tipiRespingimento={resTipiRespingimento}
        tipiTrasportoTrans={resTipiTrasportoTrans}
        unitaDiMisura={resUnitaDiMisura}
        categorieAEE={resCategoriaAEE}
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

export default RegistrazioneCreateUI;