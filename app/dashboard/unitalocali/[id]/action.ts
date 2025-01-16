'use server'
import { redirect } from 'next/navigation'
import { Prisma, PrismaClient, UnitaLocale } from '@prisma/client'
import { auth } from '../../../../auth'

const prisma = new PrismaClient()

export default async function unitaLocaleServerAction(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) {
    return { message: "Sessione non valida, riautenticarsi" }
  }

  let objectId, action, nome, indirizzo, n_civico, cap, nazione, comune, provincia, regione, tipiAttivita;

  try {
    action = formData.get("action")
    objectId = formData.get("objectId")
    nome = formData.get("nome")
    indirizzo = formData.get("indirizzo")
    n_civico = formData.get("n_civico")
    cap = formData.get("cap")
    nazione = formData.get("nazione")
    comune = formData.get("comune")
    provincia = formData.get("provincia")
    regione = formData.get("regione")
    tipiAttivita = JSON.parse(formData.get("tipiAttivitaJSON") as string)
  } catch (error) {
    return { message: 'Errore durante il recupero dei dati dal form' }
  }


  if (action === "update") {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per l\'aggiornamento' }
    }


    try {
      await prisma.unitaLocale.update({
        where: { id: objectId.toString() },
        data: {
          nome: nome ? nome.toString() : "",
          indirizzo: indirizzo ? indirizzo.toString() : "",
          n_civico: n_civico ? n_civico.toString() : "",
          cap: cap ? cap.toString() : "",
          nazione: nazione ? nazione.toString() : "",
          comune: comune ? comune.toString() : "",
          provincia: provincia ? provincia.toString() : "",
          regione: regione ? regione.toString() : "",
          tipiAttivita: tipiAttivita ? tipiAttivita : []
        }
      })
    } catch (error) {
      return { message: 'Errore del database durante l\'aggiornamento dell\'unita locale' }
    }

    redirect(`/dashboard/unitalocali`);

  } else if (action === "remove") {
    objectId = formData.get('objectId')
    if (!objectId) {
      return { message: 'ID non fornito per l\'aggiornamento' }
    }
    try {
      await prisma.unitaLocale.delete({
        where: { id: objectId.toString() }
      })
    } catch (error) {
      return { message: 'Errore del database durante la rimozione dell\'unita locale' }
    }

    redirect(`/dashboard/unitalocali`);

  } else if (action === "create") {
    let ul: Prisma.UnitaLocaleCreateInput = {
      nome: nome ? nome.toString() : "",
      indirizzo: indirizzo ? indirizzo.toString() : "",
      n_civico: n_civico ? n_civico.toString() : "",
      cap: cap ? cap.toString() : "",
      nazione: nazione ? nazione.toString() : "",
      comune: comune ? comune.toString() : "",
      provincia: provincia ? provincia.toString() : "",
      regione: regione ? regione.toString() : "",
      proprietario: { connect: { id: session.user.dbId } },
      tipiAttivita: tipiAttivita ? tipiAttivita : []
    }

    try {
      await prisma.unitaLocale.create({
        data: ul,
      });
    } catch (error) {
      return { message: 'Errore del database durante la creazione dell\'unita locale' }
    }
  }

  redirect('/dashboard/unitalocali')
} 
