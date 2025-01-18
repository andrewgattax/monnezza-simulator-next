import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import {compareSync } from "bcrypt-ts";
import { PrismaClient, Ruolo } from "@prisma/client";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface User {
    dbId: string;
    role: string;
  }
  interface Session {
    user: {
      dbId: string;
      role: string;
    } & DefaultSession["user"]
  }
  interface JWT {
    dbId: string;
    role: string;
  }
}

export async function getUserByEmail(email: string) {
  const user = await prisma.utente.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
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
          dbId: utente.id,
          name: utente.nome + " " + utente.cognome,
          email: utente.email,
          role: utente.ruolo,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      session.user.dbId = token.dbId as string;
      session.user.role = token.role as string;
      return session;
      //TODO: qua potrebbero arrivare i dati da un IDP esterno
      //poi successivamente mappati con una logica custom
    },
    async jwt({ token, user }) {
      if (user) {
        token.dbId = user.dbId;
        token.role = user.role; // Assuming 'role' is available in your user data
        //TODO: siamo sicuri non esploda?
      }
      return token;
    },
  },
});
