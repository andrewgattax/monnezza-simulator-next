import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import { getRegistrazioneByIdAndUserId } from '../database';
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

// PAGINA
export default async function RegistrazioniContainer({
  params,
}: {
  params: Promise<{ idReg: string, id: string }>;
}) {
  const awaitedParams = await params;

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
  const paramId = awaitedParams.idReg
  const registroId = awaitedParams.id
  const prisma = new PrismaClient()

  //TODO: get tipi attivita da registro in utilizzo

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumbAggiungi} />
        <RegistrazioneCreateUI registroId={registroId}/>
      </section>
    );
  } else {
    let registrazione = getRegistrazioneByIdAndUserId(paramId, session?.user?.dbId!)

    return (
      <section>
        <BreadcrumbInjector items={breadcrumbModifica} />
        <Suspense fallback={<DbLoading />}>
          <RegistrazioneCreateUI registroId={registroId} dbResult={registrazione} objectId={paramId} />
        </Suspense>
      </section>

    )
  }
}

