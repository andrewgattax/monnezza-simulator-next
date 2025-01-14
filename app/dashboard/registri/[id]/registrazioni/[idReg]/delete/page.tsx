import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from '../../../../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../../../../components/BreadcrumbInjector';
import DeleteFormTemplate from '../../../../../../../components/DeleteFormTemplate';
import { breadcrumb as oldBreadcrumb } from '../page';
import registrazioneServerAction from '../action';

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
