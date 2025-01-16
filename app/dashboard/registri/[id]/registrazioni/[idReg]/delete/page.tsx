import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from '../../../../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../../../../components/BreadcrumbInjector';
import DeleteFormTemplate from '../../../../../../../components/DeleteFormTemplate';
import { breadcrumb as oldBreadcrumb } from '../page';
import registrazioneServerAction from '../action';
import ErrorMessage from '../../../../../../../components/ErrorMessage';
import { auth } from '../../../../../../../auth';

export const metadata = {
  title: "Eliminazione Registrazione · Ri.fiuto",
};

const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Elimina",
    href: "/dashboard/registri/[id]/detail/[id]/delete",
    icon: "trash",
  },
];

// PAGINA
export default async function RegistrazioneDelete({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const paramId = (await params).id;

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <DeleteFormTemplate
        serverAction={registrazioneServerAction}
        objectId={paramId}
        itemFormalName="luogo di produzione"
        hrefBack="/dashboard/luoghiproduzione"
      />
    </section>
  );
}
