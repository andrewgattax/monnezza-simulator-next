import styles from "../../styles/DashboardLayout.module.css";
import NavBar from "../../components/NavBar";
import NavSection from "../../components/NavSection";
import NavItem from "../../components/NavItem";
import AppFooter from "../../components/AppFooter";
import { SessionProvider } from "next-auth/react"
import { auth } from "../../auth"
import { unauthorized } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  if (!session) unauthorized()
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
