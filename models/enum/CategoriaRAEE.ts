export const CategoriaRAEE = {
    CAT1: { value: "CAT1", description: "Apparecchiature per lo scambio di temperatura" },
    CAT2: { value: "CAT2", description: "Schermi, monitor ed apparecchiature dotate di schermi con una superficie superiore a 100 cm2"},
    CAT3: { value: "CAT3", description: "Lampade"},
    CAT4: { value: "CAT4", description: "Apparecchiature di grandi dimensioni (con almeno una dimensione esterna superiore a 50 cm). Questa categoria non include le apparecchiature appartenenti alle categorie 1, 2 e 3"},
    CAT5: { value: "CAT5", description: "Apparecchiature di piccole dimensioni (con nessuna dimensione esterna superiore a 50 cm). Questa categoria non include le apparecchiature appartenenti alle categorie 1, 2, 3 e 6"},
    CAT6: { value: "CAT6", description: "Piccole apparecchiature informatiche e per telecomunicazioni (con nessuna dimensione esterna superiore a 50 cm)"},
    PF: { value: "PF", description: "Pannelli Fotovoltaici)"},
  } as const;
  
  export type CategoriaRAEEENUM = keyof typeof CategoriaRAEE;