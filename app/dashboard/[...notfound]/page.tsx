import ErrorMessage from "../../../components/ErrorMessage"

export const metadata = {
  title: "Errore · Ri.fiuto"
};

export default function Error() {
  return (
    <ErrorMessage title="Pagina non trovata" message="La pagina da lei richiesta non è stata trovata" />
  )
}