import AppFooter from "../../components/AppFooter";
import styles from "../../styles/AuthLayout.module.css";
import Image from "next/image";
import LogoSoftware from '../../images/full-logo.svg';
import { SessionProvider } from "next-auth/react";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container d-flex flex-column h-100">
      <div className="row justify-content-center h-100 flex-grow-1">
        <div className={styles.authContainer}>
          <center>
            <Image src={LogoSoftware} height={60} alt="Logo software" />
          </center>
          <br />
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
