import styles from "../../styles/DashboardLayout.module.css";
import NavBar from "../../components/NavBar";
import NavSection from "../../components/NavSection";
import NavItem from "../../components/NavItem";
import AppFooter from "../../components/AppFooter";
import { SessionProvider } from "next-auth/react"
import { auth } from "../../auth"
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { EpochProvider } from "../../components/EpochContext";
import { BreadcrumbProvider } from "../../components/BreadcrumbContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  if (!session) {
    redirect('/login');
    return;
  }
  return (
    <BreadcrumbProvider>
      <div className="d-flex flex-column h-100">
        <div>
          <header>
            <SessionProvider>
              <NavBar>
                <NavSection name="Anagrafica" icon="person-vcard-fill">
                  <NavItem href="/dashboard/anagrafiche" name="Gestisci anagrafiche" icon="person-rolodex" />
                  <NavItem href="/dashboard/anagrafiche/new" name="Nuova anagrafica" icon="plus-circle" />
                  <NavItem />
                  <NavItem href="/dashboard/luoghiproduzione" name="Gestisci luoghi di produzione" icon="postcard" />
                  <NavItem href="/dashboard/luoghiproduzione/new" name="Nuovo luogo di produzione" icon="plus-circle" />
                </NavSection>
                <NavSection name="Unità Locali" icon="door-closed-fill">
                  <NavItem href="/dashboard/unitalocali" name="Gestisci unità locali" icon="view-list" />
                  <NavItem href="/dashboard/unitalocali/new" name="Nuova unità locale" icon="plus-circle" />
                </NavSection>
                <NavSection name="Registri" icon="list-nested">
                  <NavItem href="/dashboard/registri" name="Gestisci registri" icon="view-list" />
                  <NavItem href="/dashboard/registri/new" name="Nuovo registro" icon="plus-circle" />
                </NavSection>
                <NavSection name="Collegamento RENTRI" icon="arrow-left-right">
                  <NavItem href="/dashboard/rentri" name="Gestisci Certificato" icon="file-earmark-lock" />
                  <NavItem href="/dashboard/rentri/test" name="Test Comunicazione" icon="cloud-download" />
                </NavSection>
              </NavBar>
            </SessionProvider>
          </header>
        </div>
        <div className="flex-grow-1">
          <EpochProvider>
            <main className={styles.main}>{children}</main>
          </EpochProvider>
          <ToastContainer position="bottom-right" limit={1} />
        </div>
        <div className="mb-3">
          <AppFooter />
        </div>
      </div>
    </BreadcrumbProvider>
  );
}
