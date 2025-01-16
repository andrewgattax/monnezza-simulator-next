import { PrismaClient, LuogoProduzione } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLuogoProduzioneByIdAndUser(id: string, userId: string): Promise<Partial<LuogoProduzione>> {
    const luogoProduzione = await prisma.luogoProduzione.findUnique({
        where: { 
            id,
            utenteId: userId,
         },
    });
    if(!luogoProduzione) {
        throw new Error('Luogo di produzione non trovato');
    }
    return luogoProduzione!;
}

export async function getLuoghiProduzioneByUserId(userId: string): Promise<LuogoProduzione[]> {
    const luoghiProduzione = await prisma.luogoProduzione.findMany({
        where: { utenteId: userId },
    });
    return luoghiProduzione;
}

//TODO: COMBA STE FUNZIONI NON SONO SICURE VERIFICA L'UTENTE