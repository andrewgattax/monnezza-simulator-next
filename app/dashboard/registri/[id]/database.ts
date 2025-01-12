import { PrismaClient, Registro } from '@prisma/client';

const prisma = new PrismaClient();

export async function getRegistroById(id: string): Promise<Partial<Registro>> {
    const registro = await prisma.registro.findUnique({
        where: { id },
    });
    if(!registro) {
        throw new Error('Registro non trovato');
    }
    return registro!;
}