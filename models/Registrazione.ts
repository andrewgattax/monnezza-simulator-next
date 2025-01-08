import mongoose, { Document, Schema} from "mongoose";
import { IRifiuto, StatoFisicoRifiuto, PericoloRifiuto, ProvenienzaRifiuto, UnitaDiMisura } from "./Rifiuto";
import { describe } from "node:test";

enum TipoOperazione {
    CARICO = "CARICO",
    SCARICO = "SCARICO"
}

enum AttivitaENUM {
    PRODUZIONE = "PRODUZIONE",
    RECUPERO = "RECUPERO",
    SMALTIMENTO = "SMALTIMENTO",
    TRASPORTO = "TRASPORTO",
    CENTRO_DI_RACCOLTA = "CENTRO_DI_RACCOLTA",
    INTERMEDIAZIONE = "INTERMEDIAZIONE"
}


enum CausaleOperazione {
    NP = "NP",
    TERZI = "TERZI",
    DT = "DT",
    RE = "RE",
    I = "I",
    AT = "AT",
    M = "M",
    TR = "TR"
}


enum TipologiaRespingimento {
    PARZIALE = "PARZIALE",
    TOTALE = "TOTALE"
}


enum CausaleRespingimento {
    NON_CONFORME = "NON_CONFORME",
    IRRICEVIBILE = "IRRICEVIBILE",
    ALTRO = "ALTRO"
}


export interface IRegistrazione extends Document {
    data_ora_registrazione: Date,
    tipo_operazione: TipoOperazione,
    tipo_attivita: AttivitaENUM,
    causale_operazione: CausaleOperazione,
    categoria_raee: {
        value: string; 
        description: string;
    },
    numero_registrazione_pubblica_sicurezza: string,
    data_registrazione_pubblica_sicurezza: Date,
    numeroFIR: string,
    trasporto_frontaliero: boolean,
    data_inizio_trasporto: Date,
    data_fine_trasporto: Date,
    is_veicolo_fuori_uso: boolean,
    peso_a_destino: Number,
    respinto: boolean,
    tipologia_respingimento: TipologiaRespingimento,
    unita_di_misura_respingimento: UnitaDiMisura,
    causale_respingimento: CausaleRespingimento,
    causale_respingimento_desc: string,
    rif_registrazioni: [mongoose.Types.ObjectId],
    annotazioni: string,
    is_stoccaggio_instant: boolean,
    data_calcolo_stoccaggio_instant: Date,
    destinatario: mongoose.Types.ObjectId,
    produttore: mongoose.Types.ObjectId,
    trasportatore: mongoose.Types.ObjectId,
    intermediario: mongoose.Types.ObjectId,
    rifiuto: IRifiuto,
    registro: mongoose.Types.ObjectId,
}

const RegistrazioneSchema: Schema = new Schema<IRegistrazione>({
    data_ora_registrazione: { type: Date, required: true },
    tipo_operazione: { type: String, enum: Object.values(TipoOperazione), required: true },
    tipo_attivita: { type: String, enum: Object.values(AttivitaENUM), required: true },
    causale_operazione: { type: String, enum: Object.values(CausaleOperazione), required: true },
    categoria_raee: {
        value: { type: String, required: true },
        description: { type: String, required: true }
    },
    numero_registrazione_pubblica_sicurezza: { type: String, required: true },
    data_registrazione_pubblica_sicurezza: { type: Date, required: true },
    numeroFIR: { type: String, required: true },
    trasporto_frontaliero: { type: Boolean, required: true },
    data_inizio_trasporto: { type: Date, required: true },
    data_fine_trasporto: { type: Date, required: true },
    is_veicolo_fuori_uso: { type: Boolean, required: true },
    peso_a_destino: { type: Number, required: true },
    respinto: { type: Boolean, required: true },
    tipologia_respingimento: { type: String, enum: Object.values(TipologiaRespingimento), required: true },
    unita_di_misura_respingimento: { type: String, enum: Object.values(UnitaDiMisura), required: true },
    causale_respingimento: { type: String, enum: Object.values(CausaleRespingimento), required: true },
    causale_respingimento_desc: { type: String, required: true },
    rif_registrazioni: [{ type: mongoose.Types.ObjectId, ref: 'Registrazione' }],
    annotazioni: { type: String, required: true },
    is_stoccaggio_instant: { type: Boolean, required: true },
    data_calcolo_stoccaggio_instant: { type: Date, required: true },
    destinatario: { type: Schema.Types.ObjectId, ref: 'Destinatario', required: true },
    produttore: { type: Schema.Types.ObjectId, ref: 'Produttore', required: true },
    trasportatore: { type: Schema.Types.ObjectId, ref: 'Trasportatore', required: true },
    intermediario: { type: Schema.Types.ObjectId, ref: 'Intermediario', required: true },
    rifiuto: {
        provenienza_rifiuto: { type: String, enum: Object.values(ProvenienzaRifiuto), required: true },
        descrizione: { type: String, required: true },
        codice_eer: { 
            value: {type: String},
            description: { type: String }
         },
        stato_fisico_rifiuto: { type: String, enum: Object.values(StatoFisicoRifiuto), required: true },
        pericolo_rifiuto: { type: String, enum: Object.values(PericoloRifiuto) , required: true },
        quantita: { type: Number, required: true },
        unita_di_misura: { type: String, enum: Object.values(UnitaDiMisura), required: true },
        is_conferito: { type: Boolean, required: true}
    },
    registro: { type: Schema.Types.ObjectId, ref: 'Registro', required: true },
});


const Registrazione = mongoose.model<IRegistrazione>('Registrazione', RegistrazioneSchema);

export default Registrazione;