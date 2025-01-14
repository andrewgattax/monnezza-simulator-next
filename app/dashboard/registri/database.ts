import { PrismaClient, Registro } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistroByIdAndUserId(id: string, userId: string): Promise<Partial<Registro>> {
    const registro = await prisma.registro.findUnique({
        where: {
            id: id
        },
        include: {
            unitaLocale: true
        }
    });

    if (registro?.unitaLocale?.proprietarioId !== userId) {
        throw new Error('Utente non autorizzato');
    } else if (!(registro.unitaLocale.utentiDelegatiId.includes(userId))) {
        throw new Error('Utente non autorizzato');
    }

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