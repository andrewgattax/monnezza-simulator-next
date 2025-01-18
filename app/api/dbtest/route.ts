import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Example fetch to verify database connection
    const result = await prisma.utente.findFirst();
    return Response.json({ message: "ok!" });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json({ message: 'Database connection error' });
  } finally {
    await prisma.$disconnect();
  }
}