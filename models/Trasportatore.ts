import mongoose, {Document, Schema} from "mongoose";

export interface ITrasportatore extends Document {
    nazione: string,
    denominazione: string,
    codice_fiscale: string,
    n_iscrizione_albo: string,
    utente: mongoose.Types.ObjectId
}

const TrasportatoreSchema: Schema = new Schema<ITrasportatore>({
    nazione: { type: String, required: true },
    denominazione: { type: String, required: true },
    codice_fiscale: { type: String, required: true },
    n_iscrizione_albo: { type: String, required: true },
    utente: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Trasportatore = mongoose.model<ITrasportatore>('Trasportatore', TrasportatoreSchema);

export default Trasportatore;