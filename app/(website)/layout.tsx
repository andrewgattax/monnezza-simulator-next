import Link from "next/link";
import Image from "next/image";
import LogoSoftware from '../../images/full-logo.svg';
import styles from '../../styles/NavBar.module.css'

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="costruzia-bg h-100">
      <header className="border-bottom-grigio lh-1 py-3 container">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-auto text-center">
          <Link className={styles.logocustom} href="/">
            <Image src={LogoSoftware} height={40} alt="Logo software" />
          </Link>
          </div>
          <div className="col"></div>
          <div className="col-auto d-flex justify-content-end align-items-center">
            <Link className="btn btn-overcolor" href="/dashboard">Vai alla dashboard</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
