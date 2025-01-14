import { PrismaClient, UnitaLocale } from '@prisma/client'
import React, { Suspense } from 'react'
import UnitaLocaleCreateUI from './components/UnitaLocaleCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getUnitaLocaleByIdAndUserId } from './database';
import { auth } from '../../../../auth';
import BreadcrumbInjector from '../../../../components/BreadcrumbInjector';
import { BreadcrumbItem } from '../../../../components/BreadcrumbContext';
import { breadcrumb as oldBreadcrumb } from '../page';

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
    href: "/dashboard/luoghiproduzione/new",
    icon: "plus-circle",
  },
];

export const breadcrumbModifica: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Modifica",
    href: "/dashboard/luoghiproduzione/[id]",
    icon: "pencil-square",
  },
];

// PAGINA
export default async function LuoghiProduzioneContainer({
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
        <UnitaLocaleCreateUI />
      </section>

    );
  } else {
    const session = await auth();
    let unitaLocale = getUnitaLocaleByIdAndUserId(paramId, session?.user?.id!)

    return (
      <section>
        <BreadcrumbInjector items={breadcrumbModifica} />
        <Suspense fallback={<DbLoading />}>
          <UnitaLocaleCreateUI dbResult={unitaLocale} />
        </Suspense>
      </section>

    )
  }
}
