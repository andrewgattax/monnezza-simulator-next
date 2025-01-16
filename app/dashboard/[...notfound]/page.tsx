import { auth } from "../../../auth";
import ErrorMessage from "../../../components/ErrorMessage"

export const metadata = {
  title: "Errore · Ri.fiuto"
};

export default async function Error() {
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  return (
    <ErrorMessage title="Pagina non trovata" message="La pagina da lei richiesta non è stata trovata" />
  )
}