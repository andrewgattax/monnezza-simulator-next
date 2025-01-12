import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import LuogoProduzioneCreateUI from './components/LuogoProduzioneCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getLuogoProduzioneById } from './database';

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
      <LuogoProduzioneCreateUI />
    );
  } else {
    let luogoProduzione = getLuogoProduzioneById(paramId)

    return (
      <Suspense fallback={<DbLoading />}>
        <LuogoProduzioneCreateUI dbResult={luogoProduzione} />
      </Suspense>
    )
  }
}
