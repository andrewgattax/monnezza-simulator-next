import { RuoloUtente } from '../models/enum/RuoloUtente';
import Utente from '../models/Utente';
import UtenteService from '../service/UtenteService';

export function creaPrimoUtente() {
    const primoUtente = new Utente({
        nome: "Andrea",
        cognome: "Gatta",
        email: "andrea.gatta0@gmail.com",
        codice_fiscale: "GTTNDR03E20H926Q",
        passwordHash: "da fare",
        ruolo: RuoloUtente.CLIENTE,
        totpSecret: "da fare"
    })

    try {
        UtenteService.crea(primoUtente);
        return primoUtente;
    } catch (error) {
        console.error(error);
    }
    
}
