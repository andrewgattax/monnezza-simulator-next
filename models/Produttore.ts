import mongoose, {Document, Schema} from "mongoose";

export interface IProduttore extends Document {
    denominazione: string,
    codice_fiscale: string,
    nazione: string,
    utente: mongoose.Types.ObjectId
}

const ProduttoreSchema: Schema = new Schema<IProduttore>({
    denominazione: { type: String, required: true },
    codice_fiscale: { type: String, required: true },
    nazione: { type: String, default: "Italia" },
    utente: { type: Schema.Types.ObjectId, ref: 'Utente', required: true }
});

const Produttore = mongoose.model<IProduttore>('Produttore', ProduttoreSchema);

export default Produttore;