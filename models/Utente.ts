import mongoose, {Document, Schema} from "mongoose"
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

const utenteSchema: Schema = new Schema<IUtente>({
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
        unique: true,
    },
    codice_fiscale: {
        type: String,
        required: true,
        unique: true,
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

const Utente = mongoose.model<IUtente>('Utente', utenteSchema);

export default Utente;
