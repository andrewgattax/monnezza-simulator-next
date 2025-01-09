enum AttivitaENUM {
    PRODUZIONE = "PRODUZIONE",
    RECUPERO = "RECUPERO",
    SMALTIMENTO = "SMALTIMENTO",
    TRASPORTO = "TRASPORTO",
    CENTRO_DI_RACCOLTA = "CENTRO_DI_RACCOLTA",
    INTERMEDIAZIONE = "INTERMEDIAZIONE"
}

enum CodiciRifiuto {
    R1 = "R1",
    R3 = "R3",
    R5 = "R5",
    R11 = "R11",
    R13 = "R13"
}

export interface TipoAttivita {
    tipo: AttivitaENUM;
    codiciRifiuto: CodiciRifiuto[];
}

export default AttivitaENUM;

