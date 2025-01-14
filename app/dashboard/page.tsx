import { BreadcrumbItem } from "../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../components/BreadcrumbInjector";
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
      <EERSelectorFormComponent />
    </section>
  );
}
