'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, Registro, Prisma, TipoAttivita } from '@prisma/client'
import { auth } from "../../../../auth"

const prisma = new PrismaClient()

export default async function registroServerAction(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) {
    return { message: 'Sessione non valida, riautenticarsi' }
  }

  let action, objectId;

  try {
    action = formData.get("action"),
      objectId = formData.get("objectId")
  } catch (error) {
    return { message: "Errore durante il recupero dei dati" }
  }

  let descrizione, progressivoCounter, tipiAttivita, unitaLocaleId;


  try {
    action = formData.get('action')
    descrizione = formData.get("descrizione")
    progressivoCounter = formData.get("progressivoCounter")
    tipiAttivita = JSON.parse(formData.get("tipiAttivitaJSON") as string)
    unitaLocaleId = formData.get("unitaLocaleId");
  } catch (error) {
    return { message: 'Errore durante il recupero dei dati dal form' }
  }

  let tipiAttivitaConvertiti: TipoAttivita[] = [];

  //TODO: COSA MOLTO PORCA, TOGLILA QUANDO PUOI
  try {
    tipiAttivitaConvertiti = tipiAttivita.map((tipo: any) => ({
      ...tipo,
      codiciRifiuto: []
    }));
  } catch (error) {
    // non me ne frega un cazzo viva il duce
  }

  // TODO: VALIDA QUA I CAMPI!!!
  if (action !== "remove") {
    if (!descrizione) {
      return { message: 'Descrizione è un campo obbligatorio' }
    }
    if (progressivoCounter && parseInt(progressivoCounter.toString(), 10) < 0) {
      return { message: 'Il progressivo counter deve essere maggiore o uguale a 0' }
    }
    if (tipiAttivitaConvertiti.length == 0) {
      return { message: 'Seleziona almeno un tipo attività' }
    }
  }


  // TODO: verifica che l'utente sia effettivamente proprietario di quel luogo
  // TODO: METTI IL CREATED AT E UPDATEDAT A TUTTI

  if (action === 'update') {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per l\'aggiornamento' }
    }

    try {
      await prisma.registro.update({
        where: { id: objectId.toString() },
        data: {
          descrizione: descrizione ? descrizione.toString() : "",
          progressivoCounter: progressivoCounter ? parseInt(progressivoCounter.toString(), 10) : 0,
          tipiAttivita: tipiAttivitaConvertiti
        },
      });
    } catch (error) {
      return { message: 'Errore del database durante l\'aggiornamento del registro' }
    }

    redirect(`/dashboard/registri`);
  }

  if (action === 'remove') {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per la rimozione' }
    }

    try {
      await prisma.registro.delete({
        where: { id: objectId.toString() }, //TODO: aggiungere filtro per utente
      });
    } catch (error) {
      return { message: 'Errore del database durante la rimozione del registro' }
    }

    redirect(`/dashboard/registri`);
  }

  let r: Prisma.RegistroCreateInput = {
    descrizione: descrizione ? descrizione.toString() : "",
    progressivoCounter: progressivoCounter ? parseInt(progressivoCounter.toString(), 10) : 0,
    tipiAttivita: tipiAttivitaConvertiti,
    isAttivo: true,
    unitaLocale: {
      connect: {
        id: unitaLocaleId?.toString()
      }
    }
  }

  try {
    await prisma.registro.create({
      data: r,
    });
  } catch (error) {
    return { message: 'Errore del database durante la creazione del luogo di produzione' }
  }

  redirect(`/dashboard/registri`);

}