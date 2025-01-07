import mongoose, {Document, Schema} from "mongoose";

enum StatoFisicoRifiuto {
    FANGOSO,
    IN_POLVERE,
    LIQUIDO,
    SOLIDO,
    VISCHIOSO_SCIROPPOSO
}

enum PericoloRifiuto {
    ESPLOSIVO,
    COMBURENTE,
    INFIAMMABILE,
    IRRITANTE,
    TOSSICITA_SPECIFICA,
    TOSSICITA_ACUTA,
    CANCEROGENO,
    CORROSIVO,
    INFETTIVO,
    TOSSICO_PER_RIPRODUZIONE,
    MUTAGENO,
    LIBERAZIONE_DI_GAS,
    SENSIBILIZZANTE,
    ECOTOSSICO,
    NON_DEFINITO
}

enum ProvenienzaRifiuto {
    SPECIALE,
    URBANO
}

enum UnitaDiMisura {
    L,
    KG
}

export interface IRifiuto extends Document {
    codiceEER: {
        value: string; // Valore dell'attività (es. "produzione")
        description: string; // Descrizione dell'attività
    };
    provenienza_rifiuto: ProvenienzaRifiuto,
    descrizione: string,
    isConferito: boolean,
    destinatario: mongoose.Types.ObjectId,
    produttore: mongoose.Types.ObjectId,
    trasportatore: mongoose.Types.ObjectId,
    intermediario: mongoose.Types.ObjectId,
    stato_fisico_rifiuto: StatoFisicoRifiuto,
    pericolo_rifiuto: PericoloRifiuto,
    quantita: Number,
    unita_di_misura: UnitaDiMisura,
    registrazione: mongoose.Types.ObjectId
}

const RifiutoSchema: Schema = new Schema({
    codiceEER: {
        value: { type: String, required: true },
        description: { type: String, required: true }
    },
    provenienza_rifiuto: { type: String, enum: Object.values(ProvenienzaRifiuto), required: true },
    descrizione: { type: String, required: true },
    isConferito: { type: Boolean, required: true },
    destinatario: { type: Schema.Types.ObjectId, ref: 'Destinatario'},
    produttore: { type: Schema.Types.ObjectId, ref: 'Produttore'},
    trasportatore: { type: Schema.Types.ObjectId, ref: 'Trasportatore'},
    intermediario: { type: Schema.Types.ObjectId, ref: 'Intermediario'},
    stato_fisico_rifiuto: { type: String, enum: Object.values(StatoFisicoRifiuto), required: true },
    pericolo_rifiuto: { type: String, enum: Object.values(PericoloRifiuto)},
    quantita: { type: Number, required: true },
    unita_di_misura: { type: String, enum: Object.values(UnitaDiMisura), required: true },
    registrazione: { type: Schema.Types.ObjectId, ref: 'Registrazione', required: true}
});

const Rifiuto = mongoose.model<IRifiuto>('Rifiuto', RifiutoSchema);

export default Rifiuto;