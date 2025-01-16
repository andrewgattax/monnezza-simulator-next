import Link from "next/link";
import WorkInProgress from "../../../components/WorkInProgress";
import { auth } from "../../../auth";
import ErrorMessage from "../../../components/ErrorMessage";

export const metadata = {
  title: "Gestione Unita Locale · Ri.fiuto",
}

export default async function AnagraficheTable() {
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
    return (
      <section>
        <WorkInProgress />
      </section>
    );
  }
  