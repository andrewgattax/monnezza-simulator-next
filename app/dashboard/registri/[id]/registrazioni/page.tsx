import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../../page";
import { BreadcrumbItem } from "../../../../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../../../../components/BreadcrumbInjector";
import { AttivitaENUM, Registrazione } from "@prisma/client";
import { 
  getRegistrazioniByRegistroIdAndUserId, 
  getRegistrazioniByRegistroIdAndUserIdAndQueryParams 
} from "./database";
import { auth } from "../../../../../auth";
import ConditionalHider from "../../../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../../../components/SuccessfulOperationToast";
import RegistrazioneTable from "./table";
import { Suspense } from "react";
import DbLoading from "../../../../../components/DbLoading";
import NoResult from "../../../../../components/NoResult";
import ErrorMessage from "../../../../../components/ErrorMessage";
import RicercaRegistrazioni from "./[idReg]/components/ricercaRegistrazioni";
import { getAttivitaByRegistroIdAndUserId } from "../../database";

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

  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const paramId = awaitedParams.id;

  const cEER = awaitedSearchParams.cEER || undefined;
  const attivita = awaitedSearchParams.TA || undefined
  const trasmessa = awaitedSearchParams.Tr || undefined
  const dataInizio = awaitedSearchParams.dI || undefined;
  const dataFine = awaitedSearchParams.dF || undefined;
  const tipoOperazione = awaitedSearchParams.TO || undefined;

  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  let registrazioni;
  let imSearching = false;
  if (cEER || attivita || trasmessa || dataInizio || dataFine || tipoOperazione) {
    imSearching = true;
    registrazioni = getRegistrazioniByRegistroIdAndUserIdAndQueryParams(
      paramId, 
      session?.user?.dbId!, 
      cEER, 
      attivita, 
      trasmessa, 
      dataInizio, 
      dataFine,
      tipoOperazione
    );
  }else {
    registrazioni = getRegistrazioniByRegistroIdAndUserId(paramId, session?.user?.dbId!);
  }
  
  const tipiAttivita = await getAttivitaByRegistroIdAndUserId(paramId, session?.user?.dbId);
  const renderKey = paramId + "_" + cEER + "_" + attivita + "_" + trasmessa + "_" + dataInizio + "_" + dataFine + "_" + tipoOperazione;

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <RicercaRegistrazioni 
        dataEER={cEER ? cEER : undefined} 
        tipiAttivita={tipiAttivita} 
        selectedAttivita={attivita ? attivita as AttivitaENUM : undefined} 
        trasmessa={trasmessa ? trasmessa : undefined} 
        dataInizio={dataInizio ? dataInizio : undefined}
        dataFine={dataFine ? dataFine : undefined}
        selectedOperazione={tipoOperazione ? tipoOperazione : undefined}
      />
      <Suspense fallback={<section className="mt-3"><DbLoading /></section>} key={renderKey}>
        <RegistrazioneTable dataPromise={registrazioni} usingSearch={imSearching} />
      </Suspense>
    </section>
  );
}
