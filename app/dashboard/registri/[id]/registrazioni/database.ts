import { AttivitaENUM, PrismaClient, Registrazione, TipoAttivita } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistrazioneByIdAndUserId(id: string, userId: string): Promise<Registrazione> {
  const registrazione = await prisma.registrazione.findUnique({
    where: {
      id: id,
      registro: {
        unitaLocale: {
          OR: [
            { proprietarioId: userId },
            { utentiDelegatiId: { has: userId } }
          ]
        }
      }
    },
  });

  if (!registrazione) {
    throw new Error('Registrazione non trovata');
  }
  return registrazione!;
}

export async function getRegistrazioniByRegistroIdAndUserId(registroId: string, userId: string): Promise<Registrazione[]> {
  const registrazione = await prisma.registrazione.findMany({
    where: {
      registroId: registroId,
      registro: {
        unitaLocale: {
          OR: [
            { proprietarioId: userId },
            { utentiDelegatiId: { has: userId } }
          ]
        }
      }
    },
  });
  return registrazione;
}

// trasmessa posso avere "" o "trasmessa" o "nonTrasmessa"
export async function getRegistrazioniByRegistroIdAndUserIdAndQueryParams(
  registroId: string,
  userId: string,
  cEER: string | undefined,
  tipoAttivita: string | undefined,
  trasmessa: string | undefined,
  dataInizio: string | undefined,
  dataFine: string | undefined,
) {
  const registrazioni = await prisma.registrazione.findMany({
    where: {
      registroId: registroId,
      registro: {
        unitaLocale: {
          OR: [
            { proprietarioId: userId },
            { utentiDelegatiId: { has: userId } }
          ]
        }
      },
      tipoAttivita: tipoAttivita as AttivitaENUM,
      isTrasmessa: trasmessa === "" ? undefined : trasmessa === "trasmessa",
      dataOraRegistrazione: (dataInizio != undefined) && (dataFine != undefined) ? {
        gte: new Date(dataInizio),
        lte: new Date(dataFine)
      } : undefined,
      rifiuto: {
        is: {
          codiceEER: cEER
        }
      },
    },
  });
  return registrazioni;
}

