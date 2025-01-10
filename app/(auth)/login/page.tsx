"use client"
import InputWithIcon from "../../../components/InputWithIcon";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import IconB from "../../../components/IconB";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const credentialsAction = async (formData: FormData) => {
    setError(null);
    const result = await signIn("credentials", {formData: formData, redirect: false});

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
      return;
    }
  }

  // se gia loggato redirecta alla dashboard
  useEffect(() => {
    if (session?.user) {
      router.push('/dashboard');
    }
  }, [session?.user, router]);

  return !session?.user ? (
    <form action={credentialsAction}>
      <InputWithIcon type="text" name="email" placeholder="Indirizzo email" iconName="envelope" required />
      <InputWithIcon type="password" name="password" placeholder="Password" iconName="key" required />
      <InputWithIcon type="text" name="tfatoken" placeholder="Codice Temporaneo (se richiesto)" iconName="phone" />
      {error && <div className="alert alert-danger">
        <IconB iconName="exclamation-triangle" />
        Credenziali errate o codice temporaneo non valido
      </div>}
      <button type="submit" className="btn btn-primary btn-overcolor w-100">Accedi</button> 
    </form>
  ) : null;
}
