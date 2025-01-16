

import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../page";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { PrismaClient, UnitaLocale } from "@prisma/client";
import { auth } from "../../../auth";
import { getRegistriByUnitaLocaleId } from "./database";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import ConditionalHider from "../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../components/SuccessfulOperationToast";
import { Suspense } from "react";
import DbLoading from "../../../components/DbLoading";
import { Registro } from "@prisma/client";
import RegistroTable from "./table";
import { getUnitaLocaliByUserId } from "../unitalocali/[id]/database";
import SelettoreUnitaPerRegistro from "./SelettoreUnitaPerRegistro";
import ErrorMessage from "../../../components/ErrorMessage";
import NoResult from "../../../components/NoResult";
import { revalidatePath } from "next/cache";

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
  const session = await auth();
  if(!session){
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  const unitaLocali = await getUnitaLocaliByUserId(session?.user?.dbId!) 
  if(unitaLocali.length == 0) {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <NoResult formalItemName="unita locale" sesso="f" />
      </section>
    )
  }
  let registri: Promise<Registro[]>;
  const selectedUnitaLocale = (await searchParams).idUL || unitaLocali[0].id;
  try {
    registri = getRegistriByUnitaLocaleId(selectedUnitaLocale);
    if (!registri) {
      registri = getRegistriByUnitaLocaleId(unitaLocali[0].id);
    }
  } catch (error) {
    registri = getRegistriByUnitaLocaleId(unitaLocali[0].id);
  }

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <SelettoreUnitaPerRegistro unitaLocali={unitaLocali} selectedId={selectedUnitaLocale} />
      <Suspense fallback={<section className="mt-3"><DbLoading /></section>} key={selectedUnitaLocale}>
        <RegistroTable dataPromise={registri}/>
      </Suspense>
    </section>
  );
}
