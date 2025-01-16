import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import DeleteFormTemplate from "../../../../../components/DeleteFormTemplate";
import registroServerAction from "../action";
import { breadcrumb as oldBreadcrumb } from '../../page';
import { auth } from '../../../../../auth';
import ErrorMessage from '../../../../../components/ErrorMessage';

export const metadata = {
  title: "Eliminazione Registro · Ri.fiuto",
};

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Elimina",
    href: "/dashboard/registri/[id]/delete",
    icon: "trash",
  },
];

// PAGINA
export default async function RegistroDelete({
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
        serverAction={registroServerAction}
        objectId={paramId}
        itemFormalName="registro"
        hrefBack="/dashboard/registri"
      />
    </section>
  );
}
