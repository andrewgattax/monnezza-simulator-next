
import { breadcrumb as oldBreadcrumb } from "../page";
import { BreadcrumbItem } from "../../../components/BreadcrumbContext";
import { auth } from "../../../auth";

import BreadcrumbInjector from "../../../components/BreadcrumbInjector";
import { PrismaClient } from "@prisma/client";
import ErrorMessage from "../../../components/ErrorMessage";
import IconB from "../../../components/IconB";
import InputWithIcon from "../../../components/InputWithIcon";
import saveBundleToDB from "./action";

export const breadcrumb: BreadcrumbItem[] = [
  ...oldBreadcrumb,
  {
    title: "Gestione Certificato RENTRI",
    href: "/dashboard/",
    icon: "file-earmark-lock",
  },
];

export const metadata = {
  title: "Gestione Certificato RENTRI · Ri.fiuto",
}

const prisma = new PrismaClient();

export default async function RegistriPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const session = await auth();
  const sp = (await searchParams);
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
  }

  let caricato = false;

  // get the bundle
  const bundle = await prisma.bundle.findFirst({
    where: {
      proprietarioId: session.user.dbId,
    },
  });

  if(bundle?.extractedBundle) {
    caricato = true;
  }

  return (
    <section>
      <BreadcrumbInjector items={breadcrumb} />
      <div className="w-100 row justify-content-center align-items-center">
        <div className="card" style={{ width: "30rem", marginTop: "5rem" }}>
          <div className="card-body">
            <div className="mb-2"></div>
            <div className="row g-3 border-bottom mb-3">
              <div className="col-auto" style={{ borderRight: "1px solid var(--bs-border-color)" }}>
                <h4><IconB iconName="file-earmark-lock" hasPadding={false}/></h4>
              </div>
              <div className="col" style={{ marginLeft: "5px" }}>
                <h4>Gestione Certificato</h4>
              </div>
              <div className="col-auto">
                {caricato ? (
                  <span className="badge text-bg-success">Caricato</span>
                ) : (
                  <span className="badge text-bg-danger">Non caricato</span>
                )}
              </div>
            </div>
            <div className="mb-2">
              <form action={saveBundleToDB}>
                <div className="mb-2">
                  <input className="form-control" type="file" name="bundle" required />
                </div>
                <InputWithIcon placeholder="Password" type="password" iconName="key" name="password" required/>
                <div className="w-100 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary btn-overcolor">
                    <IconB iconName="floppy" hasPadding={false}/> Salva
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
