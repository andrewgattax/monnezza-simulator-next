import { PrismaClient, LuogoProduzione } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLuogoProduzioneById(id: string): Promise<Partial<LuogoProduzione>> {
    const luogoProduzione = await prisma.luogoProduzione.findUnique({
        where: { id },
    });
    if(!luogoProduzione) {
        throw new Error('Luogo di produzione non trovato');
    }
    return luogoProduzione!;
}