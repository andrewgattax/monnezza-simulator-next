import Link from "next/link";
import WorkInProgress from "../../../components/WorkInProgress";
import { auth } from "../../../auth";
import ErrorMessage from "../../../components/ErrorMessage";


export const metadata = {
  title: "Gestione 2FA · Ri.fiuto",
}

export default async function tfa() {
  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  return (
    <section>
      <WorkInProgress />
      <center>
        <Link href="/dashboard">
          Torna alla Dashboard
        </Link>
      </center>
    </section>
  );
}
