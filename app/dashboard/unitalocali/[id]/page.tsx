import { PrismaClient, UnitaLocale } from '@prisma/client'
import React, { Suspense } from 'react'
import UnitaLocaleCreateUI from './components/UnitaLocaleCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getUnitaLocaleById } from './database';

export const metadata = {
  title: "Aggiunta Luogo di Produzione · Ri.fiuto",
};

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
      <UnitaLocaleCreateUI />
    );
  } else {
    let unitaLocale = getUnitaLocaleById(paramId)

    return (
      <Suspense fallback={<DbLoading />}>
        <UnitaLocaleCreateUI dbResult={unitaLocale} />
      </Suspense>
    )
  }
}
