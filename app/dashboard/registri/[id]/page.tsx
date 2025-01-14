import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import RegistroCreateUI from './components/RegistroCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getRegistroByIdAndUserId } from '../database';
import BreadcrumbInjector from "../../../../components/BreadcrumbInjector";
import { breadcrumb as oldBreadcrumb } from '../page';
import { BreadcrumbItem } from '../../../../components/BreadcrumbContext';
import { auth } from '../../../../auth';

export const breadcrumb: BreadcrumbItem[] = {
  ...oldBreadcrumb
}

export const breadcrumbAggiungi: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Aggiungi",
    href: "/dashboard/registri/new",
    icon: "plus-circle",
  },
];

export const breadcrumbModifica: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Modifica",
    href: "/dashboard/registri/[id]",
    icon: "pencil-square",
  },
];

export const metadata = {
  title: "Aggiunta Registro · Ri.fiuto",
};

// PAGINA
export default async function RegistriContainer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramId = (await params).id
  const prisma = new PrismaClient()

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumbAggiungi} />
        <RegistroCreateUI />
      </section>

    );
  } else {
    const session = await auth();
    let registro = getRegistroByIdAndUserId(paramId, session?.user?.id!)

    return (
      <section>
        <Suspense fallback={<DbLoading />}>
          <BreadcrumbInjector items={breadcrumbModifica} />
          <RegistroCreateUI dbResult={registro} />
        </Suspense>
      </section>

    )
  }
}
