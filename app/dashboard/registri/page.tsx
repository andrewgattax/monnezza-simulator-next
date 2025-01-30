import Link from "next/link";
import { breadcrumb as oldBreadcrumb } from "../page";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { PrismaClient, UnitaLocale } from "@prisma/client";
import { auth } from "../../../auth";
import {
  getRegistriByUnitaLocaleId,
  searchRegistriByQueryAndUserId,
  countNonTrasmesseRegistrazioniByUserIdAndQuery,
  countNonTrasmesseRegistrazioniByUserIdAndUnitaLocaleId
} from "./database";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import ConditionalHider from "../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../components/SuccessfulOperationToast";
import { Suspense } from "react";
import DbLoading from "../../../components/DbLoading";
import { Registro } from "@prisma/client";
import RegistroTable from "./table";
import { getNRegistrazioniByUnitaLocaleIdAndUserId, getUnitaLocaliByUserId } from "../unitalocali/[id]/database";
import SelettoreUnitaPerRegistro from "./SelettoreUnitaPerRegistro";
import ErrorMessage from "../../../components/ErrorMessage";
import NoResult from "../../../components/NoResult";
import { revalidatePath } from "next/cache";
import InputFloating from "../../../components/InputFloating";
import IconB from "../../../components/IconB";
import RicercaRegistri from "./RicercaRegistri";
import RegNonTrasmesseCounter from "./RegNonTrasmesseCounter";

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
  const sp = (await searchParams);
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }
  const unitaLocali = await getUnitaLocaliByUserId(session?.user?.dbId!)
  if (unitaLocali.length == 0) {
    return (
      <section>
        <BreadcrumbInjector items={breadcrumb} />
        <NoResult formalItemName="unita locale" sesso="f" />
      </section>
    )
  }

  let registri: Promise<Registro[]>;
  let selectedUnitaLocale = sp.idUL || unitaLocali[0].id;
  let renderKey = selectedUnitaLocale + "_" + sp.regQuery;
  let nonTrasmesse;
  let nRegistrazioni;

  nRegistrazioni = await getNRegistrazioniByUnitaLocaleIdAndUserId(selectedUnitaLocale, session?.user?.dbId)

  if (sp.regQuery) {
    registri = searchRegistriByQueryAndUserId(sp.regQuery, session.user.dbId!);
    nonTrasmesse = countNonTrasmesseRegistrazioniByUserIdAndQuery(session.user.dbId!, sp.regQuery);
    selectedUnitaLocale = "!!search!!";
  } else {
    sp.regQuery = "";
    try {
      nonTrasmesse = countNonTrasmesseRegistrazioniByUserIdAndUnitaLocaleId(session.user.dbId!, selectedUnitaLocale);
      registri = getRegistriByUnitaLocaleId(selectedUnitaLocale);
      if (!registri) {
        registri = getRegistriByUnitaLocaleId(unitaLocali[0].id);
      }
    } catch (error) {
      registri = getRegistriByUnitaLocaleId(unitaLocali[0].id);
    }
  }

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <div className="row g-2">
        <div className="col-4">
          <SelettoreUnitaPerRegistro key={renderKey} unitaLocali={unitaLocali} selectedId={selectedUnitaLocale} />
        </div>
        <div className="col-8">
          <RicercaRegistri key={renderKey} searchQuery={sp.regQuery} />
        </div>
      </div>
      {nRegistrazioni != 0 && (
        <Suspense key={renderKey + "_nontrasmesse"}>
          <RegNonTrasmesseCounter count={nonTrasmesse!} unitaLocali={unitaLocali} selectedId={selectedUnitaLocale} />
        </Suspense>
      )}
      <Suspense fallback={<section className="mt-3"><DbLoading /></section>} key={renderKey}>
        <RegistroTable
          dataPromise={registri}
          usingSearchQuery={sp.regQuery !== ""}
          selectedUnitaLocaleId={selectedUnitaLocale}
        />
      </Suspense>
    </section>
  );
}
