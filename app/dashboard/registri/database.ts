import { PrismaClient, Registro } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistroByIdAndUserId(id: string, userId: string): Promise<Partial<Registro>> {
    
    console.log(userId);

    const registro = await prisma.registro.findUnique({
        where: {
            id: id,
            OR: [
                { unitaLocale: { proprietarioId: userId } },
                { unitaLocale: { utentiDelegati: { some: { id: userId } } } }
                //TODO: CONTROLLARE SE FUNZIONA QUANDO ABBIAMO FATTO DELEGATI
            ]
        },
        include: {
            unitaLocale: true
        }
    });

    console.log(userId);

    if (!registro) {
        throw new Error('Registro non trovato');
    }

    return registro!;
    
}

export async function getRegistriByUnitaLocaleId(unitaLocaleId: string): Promise<Registro[]> {
    const registri = await prisma.registro.findMany({
        where: { unitaLocaleId: unitaLocaleId },
    });
    return registri;
}