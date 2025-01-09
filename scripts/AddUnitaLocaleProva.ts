import mongoose from "mongoose";
import UnitaLocale, {AttivitaENUM} from "../models/UnitaLocale";
import UnitaLocaleService from "../service/UnitaLocaleService";

export function AddUnitaLocaleProva (utenteId: string) {

    const utenteObjId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(utenteId);

    const unita = new UnitaLocale({
        comune: "comunedelsesso",
        indirizzo: "via sandro sandri",
        n_civico: "69",
        nome: "sexhouse",
        provincia: "RM",
        proprietario: utenteObjId,
        tipoAttivita: [AttivitaENUM.PRODUZIONE]
    });

    try {
        UnitaLocaleService.crea(unita);
        return unita;
    } catch (error) {
        console.error(error);
    }
    
}
