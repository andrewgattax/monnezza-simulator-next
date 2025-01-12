'use client'
import ErrorMessage from "../../components/ErrorMessage"

export const metadata = {
  title: "Errore · Ri.fiuto"
};

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <ErrorMessage title="Errore generico server" message={error.message} />
  )
}