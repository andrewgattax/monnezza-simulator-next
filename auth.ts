import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UtenteService from "./service/UtenteService";
import {compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        tfatoken: { required: false },
      },
      authorize: async (credentials) => {
        const emailDaCercare = credentials.email?.toString() ? credentials.email.toString() : "";
        const passwordDaVerificare = credentials.password?.toString() ? credentials.password.toString() : "";
        const tokenDaValidare = credentials.tfatoken?.toString() ? credentials.tfatoken.toString() : "";
        const utente = await UtenteService.trovaPerEmail(emailDaCercare);
        
        if (!utente) {
          return null;
        }

        if(!compareSync(passwordDaVerificare, utente.passwordHash)) {
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
