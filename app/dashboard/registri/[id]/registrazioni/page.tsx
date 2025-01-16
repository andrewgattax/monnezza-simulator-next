import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../../page";
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Registrazioni",
    href: "/dashboard/registri/[id]/registrazioni",
    icon: "clipboard2-data",
  },
];

export const metadata = {
  title: "Gestione Registro · Ri.fiuto",
}

export default async function RegistrazioniTable({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

const paramId = (await params).id

    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <h1>Registrazioni</h1>
        <p>{paramId}</p>
      </section>
    );
  }
  