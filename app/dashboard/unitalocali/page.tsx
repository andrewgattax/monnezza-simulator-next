import Link from "next/link";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { auth } from "../../../auth";
import { getUnitaLocaliByUserId } from "./[id]/database";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import ConditionalHider from "../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../components/SuccessfulOperationToast";
import { Suspense } from "react";
import DbLoading from "../../../components/DbLoading";
import UnitaLocaleTable from "./table";


export const metadata = {
  title: "Gestione Unita Locale · Ri.fiuto",
}

export const breadcrumb: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "house",
  },
  {
    title: "Luoghi di Produzione",
    href: "/dashboard/unitalocale",
    icon: "door-closed-fill",
  },
];

export default async function UnitaLocalePage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const session = await auth();
    const data = getUnitaLocaliByUserId(session?.user?.id!); //TODO: capire perchè userId è undefined
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb}/>
        <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <Suspense fallback={<DbLoading />}>
        <UnitaLocaleTable dataPromise={data}/>
      </Suspense>
      </section>
    );
  }
  