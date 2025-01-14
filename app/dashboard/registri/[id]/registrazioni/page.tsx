import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../page";
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Registri",
    href: "/dashboard/registri/[id]/registrazioni",
    icon: "view-list",
  },
];

export const metadata = {
  title: "Gestione Registro · Ri.fiuto",
}

export default function RegistrazioniTable() {
    return (
      <section>
        <h1>Registrazioni</h1>
      </section>
    );
  }
  