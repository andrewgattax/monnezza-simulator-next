import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from '../../../../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../../../../components/BreadcrumbInjector';
import DeleteFormTemplate from '../../../../../../../components/DeleteFormTemplate';
import { breadcrumb as oldBreadcrumb } from '../../../../page';
import registrazioneServerAction from '../action';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import { auth } from '../../../../../../../auth';

export const metadata = {
  title: "Eliminazione Registrazione · Ri.fiuto",
};

// PAGINA
export default async function RegistrazioneDelete({
  params,
}: {
  params: Promise<{ id: string, idReg: string }>;
}) {

  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const frocio = await params;

  const breadcrumb: BreadcrumbItem[] = [
    ...oldBreadcrumb,
    {
      title: "Registrazioni",
      href: `/dashboard/registri/${frocio.id}/registrazioni/`,
      icon: "clipboard2-data",
    },
    {
      title: "Elimina",
      href: "/dashboard/registri/[id]/detail/[id]/delete",
      icon: "trash",
    },
  ];

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <DeleteFormTemplate
        serverAction={registrazioneServerAction}
        objectId={frocio.idReg}
        itemFormalName="registro"
        hrefBack={`/dashboard/registri/${frocio.id}/registrazioni/`}
      />
    </section>
  );
}
