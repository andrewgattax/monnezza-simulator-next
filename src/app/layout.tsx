import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./styles/globals.css";

import BootstrapClient from "./components/BootstrapClient";
import NavBar from './components/NavBar';
import NavSection from './components/NavSection';
import NavItem from './components/NavItem';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">    
      <head>
        <meta name="apple-mobile-web-app-title" content="Ri.fiuto" />
      </head>
      <body>
        <NavBar>
          <NavSection name='prova' icon='house'>
            <NavItem href='/' name='Home' icon='house' />
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
