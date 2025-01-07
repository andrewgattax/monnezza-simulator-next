
import exp from "constants";
import mongoose, {Document, Schema} from "mongoose";

export interface IDestinatario extends Document{
    denominazione: string,
    codice_fiscale: string,
    n_autorizzazione: string,
    utente: mongoose.Types.ObjectId
}

const DestinatarioSchema: Schema = new Schema<IDestinatario>({
    denominazione: { type: String, required: true },
    codice_fiscale: { type: String, required: true },
    n_autorizzazione: { type: String, required: true },
    utente: { type: Schema.Types.ObjectId, ref: 'Utente', required: true }
});

const Destinatario = mongoose.model<IDestinatario>('Destinatario', DestinatarioSchema);

export default Destinatario;