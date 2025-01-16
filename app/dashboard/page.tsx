import { BreadcrumbItem } from "../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../components/BreadcrumbInjector";
import DashCard from "../../components/DashCard";
import EERSelectorFormComponent from "../../components/EERSelectorFormComponent";

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

export default function Home() {
  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <h1>Home</h1>
      <div className="row">
        <div className="col">
          <DashCard title="Unità Locali" content="Hai tot unità locali" hrefGoTo="sos" />
        </div>
        <div className="col">
          <DashCard title="Registri" content="Hai tot registri" hrefGoTo="sos" />
        </div>
        <div className="col">
          <DashCard title="Registrazioni" content="Hai tot registrazioni" hrefGoTo="sos" />
        </div>
      </div>
    </section>
  );
}
