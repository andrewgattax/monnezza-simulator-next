import { PrismaClient, LuogoProduzione } from '@prisma/client'
import React, { Suspense } from 'react'
import RegistroCreateUI from './components/RegistroCreateUI';
import DbLoading from '../../../../components/DbLoading';
import { getRegistroById } from './database';

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
      <RegistroCreateUI />
    );
  } else {
    let registro = getRegistroById(paramId)

    return (
      <Suspense fallback={<DbLoading />}>
        <RegistroCreateUI dbResult={registro} />
      </Suspense>
    )
  }
}
