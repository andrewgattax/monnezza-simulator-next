enum AttivitaENUM {
    PRODUZIONE,
    RECUPERO,
    SMALTIMENTO,
    TRASPORTO,
    CENTRO_DI_RACCOLTA,
    INTERMEDIAZIONE
}

enum CodiciRifiuto {
    R1,
    R3,
    R5,
    R11,
    R13
}

export interface TipoAttivita {
    tipo: AttivitaENUM;
    codiciRifiuto: CodiciRifiuto[];
}

export default AttivitaENUM;

