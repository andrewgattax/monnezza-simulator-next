import mongoose, { Document, Schema} from "mongoose";
import AttivitaENUM from "./TipoAttivita";
import { CategoriaRAEEENUM } from "./enum/CategoriaRAEE";

enum TipoOperazione {
    CARICO,
    SCARICO
}

enum CausaleOperazione {
    NP,
    TERZI,
    DT,
    RE,
    I,
    AT,
    M,
    TR
}


enum TipologiaRespingimento {

}

enum UnitaDiMisura {

}

enum CausaleRespingimento {

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
    rifiuto: mongoose.Types.ObjectId,
    registro: mongoose.Types.ObjectId,
}