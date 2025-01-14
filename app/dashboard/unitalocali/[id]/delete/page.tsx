import { PrismaClient, LuogoProduzione } from '@prisma/client';
import React from 'react';
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import DeleteFormTemplate from "../../../../../components/DeleteFormTemplate";
import { breadcrumb as oldBreadcrumb } from '../page';
import unitaLocaleServerAction from '../action';

export const metadata = {
  title: "Eliminazione Unita Locale · Ri.fiuto",
};

const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Elimina",
    href: "/dashboard/unitalocali/[id]/delete",
    icon: "trash",
  },
];

// PAGINA
export default async function UnitaLocaleDelete({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramId = (await params).id;

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <DeleteFormTemplate 
        serverAction={unitaLocaleServerAction} 
        objectId={paramId}
        itemFormalName="unita locale"
        hrefBack="/dashboard/unitalocali"
      />
    </section>
  );
}
