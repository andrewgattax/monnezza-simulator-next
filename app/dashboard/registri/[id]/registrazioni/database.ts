import { PrismaClient, Registrazione } from '@prisma/client';

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

    if(!registrazione) {
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