'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, LuogoProduzione } from '@prisma/client'

export default async function luogoProduzioneServerAction(prevState: any, formData: FormData) {
  // ottieni tutti i campi 
  const id = formData.get('id')
  const nome = formData.get('nome')
  const indirizzo = formData.get('indirizzo')
  const civico = formData.get('civico')
  const cap = formData.get('cap')
  const comune = formData.get('comune')
  const provincia = formData.get('provincia')
  const regione = formData.get('regione')
  const nazione = formData.get('nazione')


  return { message: 'Please enter a valid email' }
}