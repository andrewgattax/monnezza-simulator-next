import { PrismaClient, Ruolo } from "@prisma/client";

const prisma = new PrismaClient();

// Function to create a user
export async function createUser(
  nome: string,
  cognome: string,
  email: string,
  codice_fiscale: string,
  passwordHash: string,
  ruolo: Ruolo,
  totpSecret: string
) {
  const user = await prisma.utente.create({
    data: {
      nome,
      cognome,
      email,
      codice_fiscale,
      passwordHash,
      ruolo,
      totpSecret,
    },
  });
  return user;
}

// Function to get a user by email
export async function getUserByEmail(email: string) {
  const user = await prisma.utente.findUnique({
    where: {
      email,
    },
  });
  return user;
}

// Function to update a user's data
export async function updateUser(
  id: string,
  nome?: string,
  cognome?: string,
  email?: string,
  passwordHash?: string,
  ruolo?: Ruolo,
  totpSecret?: string
) {
  const user = await prisma.utente.update({
    where: {
      id,
    },
    data: {
      nome,
      cognome,
      email,
      passwordHash,
      ruolo,
      totpSecret,
    },
  });
  return user;
}

// Function to delete a user
export async function deleteUser(id: string) {
  const user = await prisma.utente.delete({
    where: {
      id,
    },
  });
  return user;
}
