import mongoose, {Document, model, Model, Schema} from "mongoose"
import { RuoloUtente as Ruolo } from "./enum/RuoloUtente"

export interface IUtente extends Document {
    nome: string,
    cognome: string,
    email: string,
    codice_fiscale: string,
    passwordHash: string,
    ruolo: Ruolo,
    totpSecret: string
}

const UtenteSchema: Schema = new Schema<IUtente>({
    nome: {
        type: String,
        required: true,
    },
    cognome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    codice_fiscale: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    ruolo: {
        type: String,
        enum: Ruolo,
        required: true,
        default: Ruolo.CLIENTE
    },
    totpSecret: {
        type: String,
    }
});

UtenteSchema.index({ email: 1 }, { unique: true });
UtenteSchema.index({ codice_fiscale: 1 }, { unique: true });

const Utente: Model<IUtente> = mongoose.models.Utente ? mongoose.models.Utente : model<IUtente>("Utente", UtenteSchema);

(async () => {
    await Utente.syncIndexes(); // Sincronizza gli indici nel database
})();

export default Utente;
