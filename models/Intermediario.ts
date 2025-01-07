import exp from "constants";
import mongoose, {Document, Schema} from "mongoose";

export interface IIntermediario extends Document {
    nazione: string,
    denominazione: string,
    codice_fiscale: string,
    n_iscrizione_albo: string,
    utente: mongoose.Types.ObjectId
}

const IntermediarioSchema: Schema = new Schema<IIntermediario>({
    nazione: { type: String, default: "Italia"},
    denominazione: { type: String, required: true },
    codice_fiscale: { type: String, required: true },
    n_iscrizione_albo: { type: String, required: true },
    utente: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Intermediario = mongoose.model<IIntermediario>('Intermediario', IntermediarioSchema);

export default Intermediario;