import { PrismaClient, UnitaLocale } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUnitaLocaleByIdAndUserId(id: string, userId: string): Promise<Partial<UnitaLocale>> {
    const unitaLocale = await prisma.unitaLocale.findUnique({
        where: {
            id: id,
            OR: [
                { proprietarioId: userId },
                { utentiDelegatiId: { has: userId } }
            ]
        }
    });
    if(!unitaLocale) {
        throw new Error('Luogo di produzione non trovato');
    }
    return unitaLocale!;
}

export async function getUnitaLocaliByUserId(userId: string): Promise<UnitaLocale[]> {
    const unitaLocali = await prisma.unitaLocale.findMany({
        where: { 
            OR: [
                { proprietarioId: userId },
                { utentiDelegatiId: { has: userId } }
            ]
        },
    });
    return unitaLocali;
}

export async function getNRegistrazioniByUnitaLocaleIdAndUserId (unitaLocaleId: string, userId: string) {
    const unitaLocale = await prisma.unitaLocale.findUnique({
        where: {
            id: unitaLocaleId,
            OR: [
                { proprietarioId: userId },
                { utentiDelegatiId: { has: userId } }
            ]
        }
    });

    if (!unitaLocale) {
        throw new Error('Unita Locale non trovata');
    }

    const registri = await prisma.registro.findMany({
        where: {
            unitaLocaleId: unitaLocaleId
        }
    });

    const count = await prisma.registrazione.count({
        where: {
            registroId: {
                in: registri.map(registro => registro.id)
            }
        }
    });
    return count;
}