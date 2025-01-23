import { auth } from "../../auth";
import { BreadcrumbItem } from "../../components/BreadcrumbContext";
import BreadcrumbInjector from "../../components/BreadcrumbInjector";
import ErrorMessage from "../../components/ErrorMessage";
import IconB from "../../components/IconB";
import { version } from '../../package.json';

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

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <ErrorMessage title='Sessione non valida' message='Per favore, riautenticarsi' />;
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
                <h4><IconB iconName="info-square" /></h4>
              </div>
              <div className="col" style={{ marginLeft: "5px" }}>
                <h4>Ri.fiuto</h4>
              </div>
              <div className="col-auto">
                <span className="badge text-bg-secondary mr-1">ver. {version}</span>
                <span className="badge text-bg-secondary">{process.env.NODE_ENV}</span>
              </div>
            </div>
            <div style={{ textAlign: "justify" }} className="mb-2">
              Benvenuto in Ri.fiuto, il <b>gestionale pre-RENTRI</b> per il caricamento dei dati di tracciabilità dei rifiuti.
              La versione che stai usando è una beta sperimentale, se trovi problemi o hai suggerimenti, per favore, contattaci!
              <div className="mb-2"></div>
              <b>Sviluppato da:</b> <br />
              <ul>
              <li>Andrea Gatta (<a href="mailto:andrew@gat.tax">andrew@gat.tax</a>)</li>
              <li>Vittorio Lo Mele (<a href="mailto:hi@vitto.dev">hi@vitto.dev</a>)</li>
              </ul>
              per conto di <a className="alert-link" href="http://www.apulialab.com/">Apulia Lab S.r.l</a> (&copy; {new Date().getFullYear()})
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
