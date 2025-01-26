import { Session } from "next-auth";

const RENTRIRP_URI = process.env.RENTRIRP_URI;

export interface CodificheComuniResponse {
  id: string;
  code: string;
  name: string;
  properties: {
    cciaa: string;
  }
}

// CODIFICHE COMUNI
export const getCodificheComuni = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/comuni`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheComuniResponse[] = await response.json();
  return obj;
}

export interface CodificheStatiResponse {
  id: string;
  code: string;
  name: string;
}

// CODIFICHE STATI
export const getCodificheStati = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/nazioni`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheStatiResponse[] = await response.json();
  return obj;
}

// TIPI ATTIVITA
export interface CodificheTipiAttivita {
  id: string;
  code: string;
  name: string;
}

export const getCodificheTipiAttivita = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/attivita`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheTipiAttivita[] = await response.json();
  return obj;
}

// CAUSALI RESPINGIMENTO
export interface CodificheCausaleRespingimento {
  id: string;
  code: string;
  name: string;
}

export const getCodificheCausaleRespingimento = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/causali-respingimento`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheCausaleRespingimento[] = await response.json();
  return obj;
}

// ATTIVITA A DESTINAZIONE
export interface CodificheAttivitaDestinazione {
  id: string;
  code: string;
  name: string;
}

export const getCodificheAttivitaDestinazione = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/attivita-rs`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheAttivitaDestinazione[] = await response.json();
  return obj;
}

// UNITA MISURA
export interface CodificheUnitaMisura {
  id: string;
  code: string;
  name: string;
}

export const getCodificheUnitaMisura = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/unita-misura`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheUnitaMisura[] = await response.json();
  return obj;
}

// PROVENIENZA RIFIUTO
export interface CodificheProvenienzaRifiuto {
  id: string;
  code: string;
  name: string;
}

export const getCodificheProvenienzaRifiuto = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/provenienza`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheProvenienzaRifiuto[] = await response.json();
  return obj;
}

// STATO FISICO
export interface CodificheStatoFisico {
  id: string;
  code: string;
  name: string;
}

export const getCodificheStatoFisico = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/stati-fisici`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheStatoFisico[] = await response.json();
  return obj;
}

// PERICOLO RIFIUTO
export interface CodifichePericoloRifiuto {
  id: string;
  code: string;
  name: string;
}

export const getCodifichePericoloRifiuto = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/caratteristiche-pericolo`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodifichePericoloRifiuto[] = await response.json();
  return obj;
}

// TIPOLOGIA RESPINGIIMENTO
export interface CodificheTipologiaRespingimento {
  id: string;
  code: string;
  name: string;
}

export const getCodificheTipologiaRespingimento = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/tipi-respingimento`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheTipologiaRespingimento[] = await response.json();
  return obj;
}

// TIPOLOGIA TRASPORTO TRANS
export interface CodificheTrans {
  id: string;
  code: string;
  name: string;
}

export const getTrans = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/tipi-trasporto-transfrontaliero`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheTrans[] = await response.json();
  return obj;
}

// CATEGORIE AEE
export interface CodificheCategorieAEE {
  id: string;
  code: string;
  name: string;
}

export const getCodificheCategorieAEE = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/categorie-raee`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheCategorieAEE[] = await response.json();
  return obj;
}

// CODICI EER
export interface CodificheCodiciEER {
  id: string;
  code: string;
  name: string;
  properties: {
    flag_pericoloso: boolean
  }
}

export const getCodificheCodiciEER = async (session: Session) => {
  let user = session.user.dbId;
  if (!user || user == "") {
    throw new Error("Sessione non valida");
  }

  const response = await fetch(`${RENTRIRP_URI}/codifiche/v1.0/lookup/codici-eer`, {
    method: "GET",
    headers: {
      "Db-ID": user,
    },
  });

  const obj: CodificheCodiciEER[] = await response.json();
  return obj;
}