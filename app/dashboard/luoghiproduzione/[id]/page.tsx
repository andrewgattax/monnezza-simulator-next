import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import LuogoProduzioneCreateUI from './components/LuogoProduzioneCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getLuogoProduzioneByIdAndUser } from '../database';
import { auth } from '../../../../auth';
import { BreadcrumbItem } from "../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../components/BreadcrumbInjector";
import { breadcrumb as oldBreadcrumb } from '../page';
import ErrorMessage from '../../../../components/ErrorMessage';
import { getCodificheComuni, getCodificheStati } from '../../../../rentri';


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
  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  const paramId = (await params).id
  const prisma = new PrismaClient()

  const comuniPromise = getCodificheComuni(session);
  const statiPromise = getCodificheStati(session);

  if (paramId == "new") {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumbAggiungi} />
        <Suspense fallback={<DbLoading />}>
          <LuogoProduzioneCreateUI comuniPromise={comuniPromise} statiPromise={statiPromise}/>
        </Suspense>
      </section>
    );
  } else {
    let luogoProduzione = getLuogoProduzioneByIdAndUser(paramId, session?.user?.dbId!)

    return (
      <section>
        <BreadcrumbInjector items={breadcrumbModifica} />
        <Suspense fallback={<DbLoading />}>
          <LuogoProduzioneCreateUI 
            objectId={paramId} 
            dbResult={luogoProduzione} 
            comuniPromise={comuniPromise}
            statiPromise={statiPromise}
          />
        </Suspense>
      </section>
    )
  }
}
