import styles from "../../styles/DashboardLayout.module.css";
import NavBar from "../../components/NavBar";
import NavSection from "../../components/NavSection";
import NavItem from "../../components/NavItem";
import AppFooter from "../../components/AppFooter";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <NavBar>
          <NavSection name="prova" icon="house">
            <NavItem href="/" name="Home" icon="house" />
            <NavItem />
            <NavItem href="/about" name="About" icon="info" />
          </NavSection>
        </NavBar>
      </header>
      <main className={styles.main}>{children}</main>
      <AppFooter />
    </div>
  );
}
