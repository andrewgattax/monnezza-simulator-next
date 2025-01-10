"use client"
import React, { ReactNode } from 'react';
import LogoSoftware from '../images/full-logo.svg';
import styles from '../styles/NavBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import NavItem from './NavItem';
import GravatarImage from './GravatarImage';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';


interface NavBarProps {
  children: ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter();

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${styles.navpadding} ${styles.navgray}`}>
        <div className="container-fluid">
          <Link className={styles.logocustom} href="/dashboard">
            <Image src={LogoSoftware} height={30} alt="Logo software" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {children}
            </ul>
          </div>
        </div>
        <div className="flex-shrink-0 dropdown">
          <a href="#" className={`d-block link-body-emphasis text-decoration-none dropdown-toggle ${styles.bl} ${styles.mr15}`}
            data-bs-toggle="dropdown" aria-expanded="false">
              <GravatarImage email={session?.user?.email ? session?.user?.email : ""} />
              <span className={styles.username}>{session?.user?.name}</span>
          </a>
          <ul className={`dropdown-menu dropdown-menu-end text-small shadow ${styles.customDropDown}`} data-popper-placement="bottom-end">
              <NavItem href="#" name={session?.user?.email ? session?.user?.email : ""} icon="envelope" disabled />
              <NavItem />
              <NavItem href="/changepass" name="Cambia password" icon="key" />
              <NavItem href="/2fa" name="Gestisci 2FA" icon="phone" />
              <NavItem />
              <NavItem 
                href="#" name="Esci" icon="box-arrow-right" 
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: '/' , redirect: false });
                  router.push('/'); // evita full page reload (non ci piace)
                }}
              />
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;