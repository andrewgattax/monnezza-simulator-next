import { PrismaClient, UnitaLocale } from '@prisma/client'
import React, { Suspense } from 'react'
import UnitaLocaleCreateUI from './components/UnitaLocaleCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getUnitaLocaleById } from './database';
import WorkInProgress from '../../../../components/WorkInProgress';
import { auth } from '../../../../auth';
import ErrorMessage from '../../../../components/ErrorMessage';

export const metadata = {
  title: "Aggiunta Luogo di Produzione · Ri.fiuto",
};

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
        {/* <UnitaLocaleCreateUI /> */}
        <WorkInProgress />
      </section>
    );
  } else {
    let unitaLocale = getUnitaLocaleById(paramId)

    return (
      <section>
        {/* <Suspense fallback={<DbLoading />}>
          <UnitaLocaleCreateUI dbResult={unitaLocale} />
        </Suspense> */}
        <WorkInProgress />
      </section>
    )
  }
}
