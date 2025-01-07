import mongoose, {Document, Schema} from "mongoose";

export interface ILuogoDiProduzione extends Document {
    indirizzo: string,
    civico: string,
    cap: string,
    nazione: string,
    provincia: string,
    comune: string,
    utente: mongoose.Types.ObjectId
}

const LuogoDiProduzioneSchema: Schema = new Schema<ILuogoDiProduzione>({
    indirizzo: { type: String, required: true },
    civico: { type: String, required: true },
    cap: { type: String, required: true },
    nazione: { type: String, default: "Italia" },
    provincia: { type: String, required: true },
    comune: { type: String, required: true },
    utente: { type: Schema.Types.ObjectId, ref: 'Utente', required: true }
});

const LuogoDiProduzione = mongoose.model<ILuogoDiProduzione>('LuogoDiProduzione', LuogoDiProduzioneSchema);

export default LuogoDiProduzione;