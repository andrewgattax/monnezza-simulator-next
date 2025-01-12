'use server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { compareSync, hashSync, genSaltSync } from "bcrypt-ts";
import { auth } from "../../../auth"

const prisma = new PrismaClient();

export default async function changePasswordAction(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) {
    return { message: 'Sessione non valida, riautenticarsi' }
  }

  const vecchiaPassword = formData.get("old");
  const nuovaPassword = formData.get("new");
  const confermaPassword = formData.get("chk");

  const utente = await prisma.utente.findUnique({
    where: {
      id: session.user.dbId,
    },
  });

  if(!utente){
    return { message: 'Sessione non valida, riautenticarsi' }
  }

  if(!compareSync(vecchiaPassword as string, utente.passwordHash)) {
    return { message: 'Password vecchia errata' }
  }

  if(nuovaPassword != confermaPassword) {
    return { message: 'Le nuove password non combaciano' }
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{9,})/;
  if (!passwordRegex.test(nuovaPassword as string)) {
    return { message: 'La nuova password deve contenere almeno 9 caratteri, un numero e un simbolo' }
  }

  const nuovaPasswordHash = hashSync(nuovaPassword as string, genSaltSync(10));

  await prisma.utente.update({
    where: {
      id: session.user.dbId,
    },
    data: {
      passwordHash: nuovaPasswordHash,
    },
  });

  redirect("/dashboard");
}