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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      tfatoken: formData.get('tfatoken') as string,
      redirect: false
    });

    if (result?.error) {
      setLoading(false);
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
    <form onSubmit={handleSubmit} className="form-signin">
      {
        loading ? (
          <section>
            <div className="alert alert-secondary">
              <IconB iconName="database-down" />
              Caricamento in corso...
            </div>
          </section>
        ) : (
          <section>
            <InputWithIcon type="text" name="email" placeholder="Indirizzo email" iconName="envelope" required />
            <InputWithIcon type="password" name="password" placeholder="Password" iconName="key" required />
            <InputWithIcon type="text" name="tfatoken" placeholder="Codice Temporaneo (se richiesto)" iconName="phone" />
            {error && <div className="alert alert-danger">
              <IconB iconName="exclamation-triangle" />
              Credenziali errate o codice temporaneo non valido
            </div>}
            <button type="submit" className="btn btn-primary btn-overcolor w-100" disabled={loading}>
              Accedi
            </button>
          </section>
        )
      }
    </form>
  ) : (
    <section>
      <div className="alert alert-secondary">
        <IconB iconName="database-down" />
        Caricamento in corso...
      </div>
    </section>
  );
}
