import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import {compareSync } from "bcrypt-ts";
import { PrismaClient, Ruolo } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  const user = await prisma.utente.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        tfatoken: { required: false },
      },
      authorize: async (credentials) => {

        // TODO: implementa verifica modello con zod

        let utente = null;
        try {
          utente = await getUserByEmail(credentials.email as string);
        } catch (error) {
          return null;
        }

        if (!utente) {
          return null;
        }

        if(!compareSync(credentials.password as string, utente.passwordHash)) {
          return null;
        }

        // TODO: implementare la verifica del token TFA

        // mock auth 
        return {
          id: utente.id,
          name: utente.nome + " " + utente.cognome,
          email: utente.email,
          role: utente.ruolo,
        };
      },
    }),
  ],
});
