import { PrismaClient, Registro } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistroByIdAndUserId(id: string, userId: string): Promise<Partial<Registro>> {

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

export async function searchRegistriByQueryAndUserId(query: string, userId: string): Promise<Registro[]> {
    const registri = await prisma.registro.findMany({
        where: {
            OR: [
                { descrizione: { contains: query, mode: 'insensitive' } }
            ],
            AND: [
                {
                    OR: [
                        { unitaLocale: { proprietarioId: userId } },
                        { unitaLocale: { utentiDelegati: { some: { id: userId } } } }
                    ]
                }
            ]
        },
        include: {
            unitaLocale: {
                select: {
                    nome: true
                }
            }
        }
    });

    return registri;
}

export async function getAttivitaByRegistroIdAndUserId(registroId: string, userId: string) {
    const attivita = await prisma.registro.findUnique({
        where: {
            id: registroId,
            OR: [
                { unitaLocale: { proprietarioId: userId } },
                { unitaLocale: { utentiDelegati: { some: { id: userId } } } }
            ]
        },
        select: {
            tipiAttivita: {
                select: {
                    attivita: true,
                    codiciRifiuto: true
                }
            }
        }
    });

    if (!attivita) {
        throw new Error('Attività non trovata');
    }

    return attivita.tipiAttivita;
}


export async function countNonTrasmesseRegistrazioniByUserIdAndQuery(userId: string, query: string): Promise<number> {
    const registri = await prisma.registro.findMany({
        where: {
            OR: [
                { descrizione: { contains: query, mode: 'insensitive' } }
            ],
            AND: [
                {
                    OR: [
                        { unitaLocale: { proprietarioId: userId } },
                        { unitaLocale: { utentiDelegati: { some: { id: userId } } } }
                    ]
                }
            ]
        },
        include: {
            registrazioni: true
        }
    });

    let count = 0;
    for (const registro of registri) {
        count += registro.registrazioni.filter(registrazione => !registrazione.isTrasmessa).length;
    }

    return count;
}

export async function countNonTrasmesseRegistrazioniByUserIdAndUnitaLocaleId(userId: string, unitaLocaleId: string): Promise<number> {
    const registri = await prisma.registro.findMany({
        where: {
            unitaLocaleId: unitaLocaleId,
            OR: [
                { unitaLocale: { proprietarioId: userId } },
                { unitaLocale: { utentiDelegati: { some: { id: userId } } } }
            ]
        },
        include: {
            registrazioni: true
        }
    });

    let count = 0;
    for (const registro of registri) {
        count += registro.registrazioni.filter(registrazione => !registrazione.isTrasmessa).length;
    }

    return count;
}