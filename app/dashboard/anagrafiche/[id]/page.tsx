import { PrismaClient, UnitaLocale } from '@prisma/client'
import React, { Suspense } from 'react'
import UnitaLocaleCreateUI from './components/UnitaLocaleCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getUnitaLocaleById } from './database';
import WorkInProgress from '../../../../components/WorkInProgress';
import { auth } from '../../../../auth';
import ErrorMessage from '../../../../components/ErrorMessage';
import { breadcrumb as oldBreadcrumb } from '../page';
import { BreadcrumbItem } from '../../../../components/BreadcrumbContext';
import BreadcrumbInjector from '../../../../components/BreadcrumbInjector';

export const metadata = {
  title: "Aggiunta Anagrafica · Ri.fiuto",
};

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Aggiungi",
    href: `/dashboard/anagrafiche/new`,
    icon: "plus-circle",
  },
];

// PAGINA
export default async function LuoghiProduzioneContainer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  const paramId = (await params).id
  const prisma = new PrismaClient()

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <WorkInProgress />
      </section>
    );
  } else {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <WorkInProgress />
      </section>
    );
  }
}
