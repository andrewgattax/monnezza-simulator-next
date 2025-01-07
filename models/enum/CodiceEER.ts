export const CodiceEER = {
    COD_010101: { value: "01.01.01", description: "rifiuti da estrazione di minerali metalliferi" }
  } as const;
  
  export type AttivitaEnumType = keyof typeof CodiceEER;