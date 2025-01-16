import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../../page";
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import { Registrazione } from "@prisma/client";
import { getRegistrazioniByRegistroIdAndUserId } from "./database";
import { auth } from "../../../../../auth";
import ConditionalHider from "../../../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../../../components/SuccessfulOperationToast";
import RegistrazioneTable from "./table";
import { Suspense } from "react";
import DbLoading from "../../../../../components/DbLoading";
import NoResult from "../../../../../components/NoResult";

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

export default async function RegistrazionePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: { [key: string]: string }
}) {

  const paramId = (await params).id
  const session = await auth();
  const registrazioni = getRegistrazioniByRegistroIdAndUserId(paramId, session?.user?.dbId!);

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <Suspense fallback={<section className="mt-3"><DbLoading /></section>} key={paramId}>
        <RegistrazioneTable dataPromise={registrazioni} />
      </Suspense>
    </section>
  );
}
