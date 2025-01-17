import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React, { Suspense } from 'react';
import { BreadcrumbItem } from '../../../../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../../../../components/BreadcrumbInjector';
import DeleteFormTemplate from '../../../../../../../components/DeleteFormTemplate';
import { breadcrumb as oldBreadcrumb } from '../../../../page';
import registrazioneServerAction from '../action';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import { auth } from '../../../../../../../auth';
import { getRegistrazioneByIdAndUserId } from '../../database';
import DbLoading from '../../../../../../../components/DbLoading';
import RegistrazioneDetail from './detail';

export const metadata = {
  title: "Dettaglio Registrazione · Ri.fiuto",
};

// PAGINA
export default async function RegistrazioneDetailContainer({
  params,
}: {
  params: Promise<{ id: string, idReg: string }>;
}) {

  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const frocioParams = await params;
  
  const registrazione = getRegistrazioneByIdAndUserId(frocioParams.idReg, session?.user?.dbId)


  const breadcrumb: BreadcrumbItem[] = [
    ...oldBreadcrumb,
    {
      title: "Registrazioni",
      href: `/dashboard/registri/${frocioParams.id}/registrazioni/`,
      icon: "clipboard2-data",
    },
    {
      title: "Dettaglio",
      href: "/dashboard/registri/[id]/detail/[id]/detail",
      icon: "list",
      //TODO: CAMBIA ICONA DETTAGLIO
    },
  ];

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <Suspense fallback={<section className="mt-3"><DbLoading /></section>} key={frocioParams.idReg}>
        <RegistrazioneDetail registrazione={registrazione}  />
      </Suspense>
    </section>
  );
}
