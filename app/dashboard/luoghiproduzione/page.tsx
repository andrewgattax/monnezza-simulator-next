
import { PrismaClient } from '@prisma/client'
import { Suspense } from "react";
import DbLoading from "../../../components/DbLoading";
import { toast } from "react-toastify";
import ConditionalHider from "../../../components/ConditionalHider";
import SuccessfulOperationToast from "../../../components/SuccessfulOperationToast";
import LuogoProduzioneTable from "./table";
import { getLuoghiProduzioneByUserId } from "./database";
import {auth} from "../../../auth";
import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { breadcrumb as oldBreadcrumb } from "../page";

export const metadata = {
  title: "Gestione Luoghi di Produzione · Ri.fiuto",
}

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Luoghi di Produzione",
    href: "/dashboard/luoghiproduzione",
    icon: "postcard",
  }
];

const prisma = new PrismaClient();

export default async function LuoghiProduzionePage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const session = await auth();
  const data = getLuoghiProduzioneByUserId(session?.user?.id!);
  return (
    <section>
      <BreadcrumbInjector items={breadcrumb}/>
      <ConditionalHider hidden={(await searchParams).success != "1"}>
        <SuccessfulOperationToast />
      </ConditionalHider>
      <Suspense fallback={<DbLoading />}>
        <LuogoProduzioneTable dataPromise={data} />
      </Suspense>
    </section>
  );
}
