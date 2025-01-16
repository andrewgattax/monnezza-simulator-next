import { PrismaClient, UnitaLocale } from '@prisma/client'
import React, { Suspense } from 'react'
import UnitaLocaleCreateUI from './components/UnitaLocaleCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getUnitaLocaleByIdAndUserId } from './database';
import { auth } from '../../../../auth';
import BreadcrumbInjector from '../../../../components/BreadcrumbInjector';
import { BreadcrumbItem } from '../../../../components/BreadcrumbContext';
import { breadcrumb as oldBreadcrumb } from '../page';
import ErrorMessage from '../../../../components/ErrorMessage';

export const metadata = {
  title: "Aggiunta Luogo di Produzione · Ri.fiuto",
};

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb
]

export const breadcrumbAggiungi: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Aggiungi",
    href: "/dashboard/unitalocali/new",
    icon: "plus-circle",
  },
];

export const breadcrumbModifica: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Modifica",
    href: "/dashboard/unitalocali/[id]",
    icon: "pencil-square",
  },
];

// PAGINA
export default async function UnitaLocaleContainer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const paramId = (await params).id
  const prisma = new PrismaClient()

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumbAggiungi} />
        <UnitaLocaleCreateUI />
      </section>

    );
  } else {
    let unitaLocale = getUnitaLocaleByIdAndUserId(paramId, session?.user?.dbId!)

    return (
      <section>
        <BreadcrumbInjector items={breadcrumbModifica} />
        <Suspense fallback={<DbLoading />}>
          <UnitaLocaleCreateUI dbResult={unitaLocale} objectId={paramId} />
        </Suspense>
      </section>

    )
  }
}
