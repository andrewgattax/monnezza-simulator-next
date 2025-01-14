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

  /*
  let objectId, action, nome, indirizzo, civico, cap, comune, provincia, regione, nazione;
  try {
    action = formData.get('action')
    nome = formData.get('nome')
    indirizzo = formData.get('indirizzo')
    civico = formData.get('civico')
    cap = formData.get('cap')
    comune = formData.get('comune')
    provincia = formData.get('provincia')
    regione = formData.get('regione')
    nazione = formData.get('nazione')
  } catch (error) {
    return { message: 'Errore durante il recupero dei dati dal form' }
  }
    */

  // TODO: VALIDA QUA I CAMPI!!!
  // TODO: verifica che l'utente sia effettivamente proprietario di quel luogo

  /*
  
    if (action === 'update') {
      objectId = formData.get('objectId')
      if (!objectId) {
        return { message: 'ID non fornito per l\'aggiornamento' }
      }
  
      try {
        await prisma.luogoProduzione.update({
        where: { id: objectId.toString() },
        data: {
          nome: nome ? nome.toString() : "",
          indirizzo: indirizzo ? indirizzo.toString() : "",
          civico: civico ? civico.toString() : "",
          cap: cap ? cap.toString() : "",
          comune: comune ? comune.toString() : "",
          provincia: provincia ? provincia.toString() : "",
          regione: regione ? regione.toString() : "",
          nazione: nazione ? nazione.toString() : "",
        },
        });
      } catch (error) {
        return { message: 'Errore del database durante l\'aggiornamento del luogo di produzione' }
      }
  
      redirect(`/dashboard/luoghiproduzione`);
    }
  
    */

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

  /*
  let lp: Prisma.LuogoProduzioneCreateInput = {
    nome: nome ? nome.toString() : "",
    indirizzo: indirizzo ? indirizzo.toString() : "",
    civico: civico ? civico.toString() : "",
    cap: cap ? cap.toString() : "",
    comune: comune ? comune.toString() : "",
    provincia: provincia ? provincia.toString() : "",
    regione: regione ? regione.toString() : "",
    nazione: nazione ? nazione.toString() : "",
    utente: {
      connect: {
        id: session.user.dbId
      }
    }
  }

  try {
    await prisma.luogoProduzione.create({
      data: lp,
    });
  } catch (error) {
    return { message: 'Errore del database durante la creazione del luogo di produzione' }
  }
*/
  redirect(`/dashboard/registri`);
  
}