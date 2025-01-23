'use server'
import { redirect } from 'next/navigation'
import { Prisma, PrismaClient, TipoAttivita, UnitaLocale } from '@prisma/client'
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

  let tipiAttivitaConvertiti: TipoAttivita[] = [];

  //TODO: PORCATA IMMENSA!!
  try {
    if (tipiAttivita && tipiAttivita.length > 0) {
      tipiAttivitaConvertiti = tipiAttivita.map((attivita: any) => ({
        ...attivita,
        codiciRifiuto: []
      }))
    }
  } catch (error) {
    // non me ne frega un cazzo perche probabilmente sono in delete
  }

  if(action!=="remove") {
    if (!nome) {
      return { message: 'Nome è un campo obbligatorio' }
    }
    if (!indirizzo) {
      return { message: 'Indirizzo è un campo obbligatorio' }
    }
    if (!n_civico) {
      return { message: 'Numero civico è un campo obbligatorio' }
    } else if (parseInt(n_civico.toString(), 10) <= 0) {
      return { message: 'Numero civico non valido' }
    }
    if (!nazione) {
      return { message: 'Nazione è un campo obbligatorio' }
    }
    if (!regione) {
      return { message: 'Regione è un campo obbligatorio' }
    }
    if (!provincia) {
      return { message: 'Provincia è un campo obbligatorio' }
    }
    if (!comune) {
      return { message: 'Comune è un campo obbligatorio' }
    }
    if (!cap) {
      return { message: 'CAP è un campo obbligatorio' }
    }
    if (tipiAttivitaConvertiti.length == 0) {
      return { message: 'Seleziona almeno un tipo attività' }
    }
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
          tipiAttivita: tipiAttivitaConvertiti
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
      return {
        message: 'Errore del database durante la rimozione dell\'unita locale, ' +
          'verifica che l\'unita locale che stai cercando di rimuovere non abbia registri al suo interno.'
      }
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
      tipiAttivita: tipiAttivitaConvertiti
    }

    console.log(ul);

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
