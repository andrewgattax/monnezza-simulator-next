import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/DashboardLayout.css";

import BootstrapClient from "../components/BootstrapClient";
import NavBar from '../components/NavBar';
import NavSection from '../components/NavSection';
import NavItem from '../components/NavItem';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <NavBar>
          <NavSection name='prova' icon='house'>
            <NavItem href='/' name='Home' icon='house' />
            <NavItem />
            <NavItem href='/about' name='About' icon='info' />
          </NavSection>
        </NavBar>
        <main>
          {children}
        </main>
      </body>
    <BootstrapClient />
    </html>
  );
}
