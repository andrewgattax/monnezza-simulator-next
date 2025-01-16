'use server'
import { redirect } from 'next/navigation'
import { PrismaClient, Registro, Prisma } from '@prisma/client'
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

  console.log(formData.get("tipiAttivitaJSON"));
  console.log(tipiAttivita);

  //TODO: COSA MOLTO PORCA, TOGLILA QUANDO PUOI
  tipiAttivita = tipiAttivita.map((tipo: any) => ({
    ...tipo,
    codiciRifiuto: []
  }));

  // TODO: VALIDA QUA I CAMPI!!!
  // TODO: verifica che l'utente sia effettivamente proprietario di quel luogo
  // TODO: METTI IL CREATED AT E UPDATEDAT A TUTTI

  if (action === 'update') {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per l\'aggiornamento' }
    }

    console.log(descrizione, progressivoCounter, tipiAttivita);

    try {
      await prisma.registro.update({
        where: { id: objectId.toString() },
        data: {
          descrizione: descrizione ? descrizione.toString() : "",
          progressivoCounter: progressivoCounter ? parseInt(progressivoCounter.toString(), 10) : 0,
          tipiAttivita: tipiAttivita ? tipiAttivita : []
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
    tipiAttivita: tipiAttivita ? tipiAttivita : [],
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