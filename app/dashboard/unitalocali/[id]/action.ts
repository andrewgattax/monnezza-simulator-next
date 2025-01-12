'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, LuogoProduzione } from '@prisma/client'

export default async function luogoProduzioneServerAction(prevState: any, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { message: 'Please enter a valid email' }
}