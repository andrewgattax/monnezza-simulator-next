import { PrismaClient, UnitaLocale } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUnitaLocaleById(id: string): Promise<Partial<UnitaLocale>> {
    const unitaLocale = await prisma.unitaLocale.findUnique({
        where: { id },
    });
    if(!unitaLocale) {
        throw new Error('Luogo di produzione non trovato');
    }
    return unitaLocale!;
}