'use server'

import { redirect } from 'next/navigation'
import { PrismaClient, LuogoProduzione } from '@prisma/client'

export async function cercaLuogoDiProduzione(prevState: any, paramId: string) {
  const prisma = new PrismaClient();

  try {
    const luogoProduzione = await prisma.luogoProduzione.findUnique({
      where: { id: paramId },
    })

    return {error: false, data: luogoProduzione}
  } catch {
    return {error: true}
   }
}

export async function creaLuogoProduzione(prevState: any, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { message: 'Please enter a valid email' }
}