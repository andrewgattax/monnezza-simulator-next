import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../page";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { PrismaClient } from "@prisma/client/extension";
import { auth } from "../../../auth";
import { getRegistriByUnitaLocaleId } from "./database";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import ConditionalHider from "../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../components/SuccessfulOperationToast";
import { Suspense } from "react";
import DbLoading from "../../../components/DbLoading";
import { Registro } from "@prisma/client";
import RegistroTable from "./table";

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Registri",
    href: "/dashboard/registri",
    icon: "view-list",
  },
];

export const metadata = {
  title: "Gestione Registri · Ri.fiuto",
}

const prisma = new PrismaClient();

export default async function RegistriPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  /*
  const session = await auth();
  const data = getRegistriByUnitaLocaleId()
  */
  //TODO: UNITA LOCALE ID (in sessione o nel link?)
  const tempData: Registro[] = [];
  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <Suspense fallback={<DbLoading />}>
      {/*<RegistroTable dataPromise={tempData} />*/}
      <h1>Da implenentare</h1>
      {
        //TODO: Pronto con dataPromise sopra
      }       
      </Suspense>
    </section>
  );
}
