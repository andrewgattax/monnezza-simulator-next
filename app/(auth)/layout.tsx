import AppFooter from "../../components/AppFooter";
import styles from "../../styles/AuthLayout.module.css";
import Image from "next/image";
import LogoSoftware from '../../images/full-logo.svg';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={styles.authContainer}>
          <center>
            <Image src={LogoSoftware} height={60} alt="Logo software" />
          </center>
          <br />
          {children}
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
