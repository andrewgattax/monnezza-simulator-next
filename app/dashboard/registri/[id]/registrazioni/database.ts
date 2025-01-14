import { PrismaClient, Registrazione } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistrazioneByIdAndUserId(id: string, userId: string): Promise<Partial<Registrazione>> {
    const registrazione = await prisma.registrazione.findUnique({
        where: { 
            id,
            registro: {
                unitaLocale: {
                    proprietarioId: userId,
                    utentiDelegatiId: {
                        has: userId
                    }
                }
            }
         },
    });

    if(!registrazione) {
        throw new Error('Registrazione non trovata');
    }
    return registrazione!;
}

export async function getLuoghiProduzioneByRegistroId(registroId: string): Promise<Registrazione[]> {
    const registrazione = await prisma.registrazione.findMany({
        where: { registroId: registroId },
    });
    return registrazione;
}