import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import DeleteFormTemplate from "../../../../../components/DeleteFormTemplate";
import registroServerAction from "../action";
import { breadcrumb as oldBreadcrumb } from '../page';

export const metadata = {
  title: "Eliminazione Registro · Ri.fiuto",
};

const breadcrumb: BreadcrumbItem[] = [
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
