import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import { getRegistrazioneByIdAndUserId, getRegistrazioniFiglieProgressiviByRegistrazioneIdAndUserId } from '../database';
import RegistrazioneCreateUI from './components/RegistrazioneCreateUI';
import DbLoading from '../../../../../../components/DbLoading';
export const metadata = {
  title: "Aggiunta Registrazione · Ri.fiuto",
};
import { breadcrumb as oldBreadcrumb } from '../../../page';
import { BreadcrumbItem } from '../../../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../../../components/BreadcrumbInjector';
import { auth } from '../../../../../../auth';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { breadcrumb } from '../page';
import { getAttivitaByRegistroIdAndUserId } from '@/dashboard/registri/database';
import { getCodificheAttivitaDestinazione, getCodificheCategorieAEE, getCodificheCausaleRespingimento, getCodifichePericoloRifiuto, getCodificheProvenienzaRifiuto, getCodificheStatoFisico, getCodificheTipologiaRespingimento, getCodificheUnitaMisura, getTrans } from '../../../../../../rentri';

// PAGINA
export default async function RegistrazioniContainer({
  params,
}: {
  params: Promise<{ idReg: string, id: string }>;
}) {
  const awaitedParams = await params;
  const paramId = awaitedParams.idReg
  const registroId = awaitedParams.id

  const breadcrumb: BreadcrumbItem[] = [
    ...oldBreadcrumb,
    {
      title: "Registrazioni",
      href: `/dashboard/registri/${registroId}/registrazioni/`,
      icon: "clipboard2-data",
    },
  ];

  const breadcrumbAggiungi: BreadcrumbItem[] = [
    ...breadcrumb,
    {
      title: "Aggiungi",
      href: "/dashboard/registri/[id]/registrazioni/new",
      icon: "plus-circle",
    },
  ];

  const breadcrumbModifica: BreadcrumbItem[] = [
    ...breadcrumb,
    {
      title: "Modifica",
      href: "/dashboard/registri/[id]/registrazioni/[idReg]",
      icon: "pencil-square",
    },
  ];

  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const tipiAttivita = await getAttivitaByRegistroIdAndUserId(registroId, session?.user?.dbId);

  let progressivi;

  if (paramId != "new") {
    progressivi = await getRegistrazioniFiglieProgressiviByRegistrazioneIdAndUserId(paramId, session?.user?.dbId);
  }

  const causaliRespingimento = getCodificheCausaleRespingimento(session);
  const pericoliRifiuto = getCodifichePericoloRifiuto(session);
  const provenienzeRifiuto = getCodificheProvenienzaRifiuto(session);
  const statiFisiciRifiuto = getCodificheStatoFisico(session);
  const tipiRespingimento = getCodificheTipologiaRespingimento(session);
  const tipiTrasportoTrans = getTrans(session);
  const unitaDiMisura = getCodificheUnitaMisura(session);
  const attivitaADestinazione = getCodificheAttivitaDestinazione(session);
  const categorieAEE = getCodificheCategorieAEE(session);


  const prisma = new PrismaClient()

  //TODO: get tipi attivita da registro in utilizzo

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumbAggiungi} />
        <RegistrazioneCreateUI tipiAttivita={tipiAttivita} registroId={registroId} causaliRespingimento={causaliRespingimento}
          pericoliRifiuto={pericoliRifiuto}
          provenienzaRifiuto={provenienzeRifiuto}
          statiFisiciRifiuto={statiFisiciRifiuto}
          tipiRespingimento={tipiRespingimento}
          tipiTrasportoTrans={tipiTrasportoTrans}
          unitaDiMisura={unitaDiMisura}
          attivitaADestinazione={attivitaADestinazione}
          categorieAEE={categorieAEE} />
      </section>
    );
  } else {
    let registrazione = getRegistrazioneByIdAndUserId(paramId, session?.user?.dbId!)

    return (
      <section>
        <BreadcrumbInjector items={breadcrumbModifica} />
        <Suspense fallback={<DbLoading />}>
          <RegistrazioneCreateUI tipiAttivita={tipiAttivita} registroId={registroId} dbResult={registrazione} objectId={paramId} progressivi={progressivi}
          causaliRespingimento={causaliRespingimento}
          pericoliRifiuto={pericoliRifiuto}
          provenienzaRifiuto={provenienzeRifiuto}
          statiFisiciRifiuto={statiFisiciRifiuto}
          tipiRespingimento={tipiRespingimento}
          tipiTrasportoTrans={tipiTrasportoTrans}
          unitaDiMisura={unitaDiMisura}
          attivitaADestinazione={attivitaADestinazione}
          categorieAEE={categorieAEE} />
        </Suspense>
      </section>

    )
  }
}

