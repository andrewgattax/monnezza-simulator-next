import Link from "next/link";
import WorkInProgress from "../../../components/WorkInProgress";
import { auth } from "../../../auth";
import ErrorMessage from "../../../components/ErrorMessage";
import { breadcrumb as oldBreadcrumb } from '../page';
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";

export const metadata = {
  title: "Gestione Anagrafiche · Ri.fiuto",
}

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Anagrafiche",
    href: `/dashboard/anagrafiche/`,
    icon: "person-rolodex",
  },
];

export default async function AnagraficheTable() {
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <WorkInProgress />
      </section>
    );
  }
  