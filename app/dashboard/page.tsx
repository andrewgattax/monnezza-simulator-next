import { auth } from "../../auth";
import { BreadcrumbItem } from "../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../components/BreadcrumbInjector";
import ErrorMessage from "../../components/ErrorMessage";

export const metadata = {
  title: "Dashboard · Ri.fiuto"
};

export const breadcrumb: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "house",
  }
];

export default async function Home() {
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <h5>riempi la dash con qualcosa :(</h5>
    </section>
  );
}
