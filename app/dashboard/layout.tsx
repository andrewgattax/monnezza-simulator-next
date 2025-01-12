import styles from "../../styles/DashboardLayout.module.css";
import NavBar from "../../components/NavBar";
import NavSection from "../../components/NavSection";
import NavItem from "../../components/NavItem";
import AppFooter from "../../components/AppFooter";
import { SessionProvider } from "next-auth/react"
import { auth } from "../../auth"
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  if (!session){
    redirect('/login');
    return;
  }
  return (
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
          </NavBar>
        </SessionProvider>
      </header>
      <main className={styles.main}>{children}</main>
      <ToastContainer position="bottom-right" />
      <AppFooter />
    </div>
  );
}
