import Utente from "../../../models/Utente";
import UtenteService from "../../../service/UtenteService";
import { RuoloUtente } from "../../../models/enum/RuoloUtente";

export default async function Prova() {
  const creaUtente = async (formData: FormData) => {
    "use server"
    const primoUtente = new Utente({
      nome: "Vittorio",
      cognome: "Lo Mele",
      email: "hi@vitto.dev",
      codice_fiscale: "LMLVTR05S09H926A",
      passwordHash:
        "$2a$12$fbWU0RmxegiiZhJD3AG0BO6gyIOwF6BLM2QoV6aG6SwPSLqhZprPG",
      ruolo: RuoloUtente.ADMIN,
      totpSecret: null,
    });

    try {
      UtenteService.crea(primoUtente);
    } catch (error) {
    }
  }

  const utente = await UtenteService.trovaPerEmail("hi@vitto.dev");
  const utenteJsonPretty = JSON.stringify(utente, null, 2);

  return (
    <section>
      <h1>Prova della dashboard</h1>
      <form action={creaUtente}>
        <button type="submit">Crea primo utente</button>
      </form>
      <h4>ora cerco un utente dio merda</h4>
      <code>
        {utenteJsonPretty}
      </code>
    </section>
  );
}
