import mongoose, {Document, Schema} from "mongoose"

enum Ruolo {
    ADMIN = 'admin',
    CLIENTE = 'cliente'
}

export interface IUtente extends Document {
    nome: string,
    cognome: string,
    email: string,
    codice_fiscale: string,
    passwordHash: string,
    ruolo: Ruolo
}

const utenteSchema = new Schema<IUtente>({
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
});

const Utente = mongoose.model<IUtente>('Utente', utenteSchema);

export default Utente;