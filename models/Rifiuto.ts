import mongoose from "mongoose";

export enum StatoFisicoRifiuto {
    FANGOSO = "FANGOSO",
    IN_POLVERE = "IN_POLVERE",
    LIQUIDO = "LIQUIDO",
    SOLIDO = "SOLIDO",
    VISCHIOSO_SCIROPPOSO = "VISCHIOSO_SCIROPPOSO"
}

export enum PericoloRifiuto {
    ESPLOSIVO = "ESPLOSIVO",
    COMBURENTE = "COMBURENTE",
    INFIAMMABILE = "INFIAMMABILE",
    IRRITANTE = "IRRITANTE",
    TOSSICITA_SPECIFICA = "TOSSICITA_SPECIFICA",
    TOSSICITA_ACUTA = "TOSSICITA_ACUTA",
    CANCEROGENO = "CANCEROGENO",
    CORROSIVO = "CORROSIVO",
    INFETTIVO = "INFETTIVO",
    TOSSICO_PER_RIPRODUZIONE = "TOSSICO_PER_RIPRODUZIONE",
    MUTAGENO = "MUTAGENO",
    LIBERAZIONE_DI_GAS = "LIBERAZIONE_DI_GAS",
    SENSIBILIZZANTE = "SENSIBILIZZANTE",
    ECOTOSSICO = "ECOTOSSICO",
    NON_DEFINITO = "NON_DEFINITO"
}

export enum ProvenienzaRifiuto {
    SPECIALE = "SPECIALE",
    URBANO = "URBANO"
}

export enum UnitaDiMisura {
    L = "L",
    KG = "KG"
}

export interface IRifiuto {
    codiceEER: {
        value: string; // Valore dell'attività (es. "produzione")
        description: string; // Descrizione dell'attività
    };
    provenienza_rifiuto: ProvenienzaRifiuto,
    descrizione: string,
    isConferito: boolean,
    stato_fisico_rifiuto: StatoFisicoRifiuto,
    pericolo_rifiuto: PericoloRifiuto,
    quantita: Number,
    unita_di_misura: UnitaDiMisura,
}

