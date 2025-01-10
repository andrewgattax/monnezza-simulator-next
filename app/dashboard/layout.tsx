import styles from "../../styles/DashboardLayout.module.css";
import NavBar from "../../components/NavBar";
import NavSection from "../../components/NavSection";
import NavItem from "../../components/NavItem";
import AppFooter from "../../components/AppFooter";
import { SessionProvider } from "next-auth/react"
import { auth } from "../../auth"
import { redirect, unauthorized } from "next/navigation";


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
            <NavSection name="prova" icon="house">
              <NavItem href="/" name="torna al sito!!!!" icon="house" />
              <NavItem />
              <NavItem href="/dashboard" name="dashboard" icon="info" />
            </NavSection>
            <NavSection name="Anagrafica" icon="person-vcard-fill">
              <NavItem href="/dashboard/produttori" name="Produttori" icon="person-square" />
              <NavItem href="/dashboard/destinatari" name="Destinatari" icon="person-square" />
              <NavItem href="/dashboard/intermediari" name="Intermediari" icon="person-square" />
              <NavItem href="/dashboard/trasportatori" name="Trasportatori" icon="person-square" />
              <NavItem href="/dashboard/luoghidiproduzione" name="Luoghi di produzione" icon="postcard" />
            </NavSection>
            <NavSection name="Unità Locali" icon="door-closed-fill">
              <NavItem href="/dashboard/creaunitalocale" name="Nuova unità locale" icon="plus-circle-fill" />
              <NavItem href="/dashboard/unitalocali" name="Gestisci unità locali" icon="view-list" />
            </NavSection>
            <NavSection name="Registri" icon="list-nested">
              <NavItem href="/dashboard/crearegistro" name="Nuovo registro" icon="plus-circle-fill" />
              <NavItem href="/dashboard/registri" name="Gestisci registri" icon="view-list" />
            </NavSection>
            <NavSection name="prova2" icon="house">
              <NavItem href="/dashboard/prova" name="prova" icon="people" />
              <NavItem />
              <NavItem href="/dashboard/prove" name="prove" icon="person-plus" />
            </NavSection>
          </NavBar>
        </SessionProvider>
      </header>
      <main className={styles.main}>{children}</main>
      <AppFooter />
    </div>
  );
}
