import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import DeleteFormTemplate from "../../../../../components/DeleteFormTemplate";
import luogoProduzioneServerAction from "../action";
import { breadcrumb as oldBreadcrumb } from '../page';

export const metadata = {
  title: "Eliminazione Luogo di Produzione · Ri.fiuto",
};

const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Elimina",
    href: "/dashboard/luoghiproduzione/[id]/delete",
    icon: "trash",
  },
];

// PAGINA
export default async function LuoghiProduzioneDelete({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramId = (await params).id;

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <DeleteFormTemplate 
        serverAction={luogoProduzioneServerAction} 
        objectId={paramId}
        itemFormalName="luogo di produzione"
        hrefBack="/dashboard/luoghiproduzione"
      />
    </section>
  );
}
