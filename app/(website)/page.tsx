import Link from "next/link";
import { creaPrimoUtente } from "../../scripts/AddUtenteProva";
import Utente from "../../models/Utente";
import { AddUnitaLocaleProva } from "../../scripts/AddUnitaLocaleProva";
import { auth } from "../../auth";

export async function aggiungiUtente() {
  try {
    const utente = await creaPrimoUtente();
    if(utente) {
      return {
        props: {
          messaggio: `Utente aggiunto con successo: ${utente.nome} ${utente.cognome}`,
        },
      };
    } 
  } catch (errore) {
    console.error("Errore durante l'aggiunta dell'utente:", errore);
    return {
      props: {
        messaggio: "Errore durante l'aggiunta dell'utente",
      },
    };
  }
}

async function aggiungiUnitaLocale() {

  const session = await auth();

  if (!session?.user) return null

  try {
    const unita = await AddUnitaLocaleProva(session.user.id!);
    if(unita) {
      return {
        props: {
          messaggio: `unita aggiunta con successo: ${unita.nome}`,
        },
      };
    } 
  } catch (errore) {
    console.error("Errore durante l'aggiunta dell'unita:", errore);
    return {
      props: {
        messaggio: "Errore durante l'aggiunta dell'unita",
      },
    };
  }
}

export default async function Home() {
  return (
    <div>
      <h1>Home ma del sito presentazione</h1>
      <Link href="/dashboard">vai alla dashboard</Link> <br />
      <br />
    </div>
);
}
  