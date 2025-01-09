import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { RuoloUtente } from "./models/enum/RuoloUtente";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        tfatoken: { required: false },
      },
      authorize: async (credentials) => {
        
        // mock auth 
        let user = null; 
        user = {
          id: "test",
          name: "Test User",
          email: "pincopallo@vitto.dev",
          role: RuoloUtente.ADMIN,
        };

        if (!user) {
          throw new Error("Credenziali non valide");
        }

        return user;
      },
    }),
  ],
});
