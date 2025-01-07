import '../styles/NavBar.css'
import LogoSoftware from '../full-logo.svg'

import React, { ReactNode } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import IconB from '../components/IconB'

interface NavBarProps {
  children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-padding nav-gray">
        <div className="container-fluid">
          <Link className="logocustom" href="/">
            <Image
              src={LogoSoftware}
              height={30}
              alt="Logo software"
            />
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
        <div className="flex-shrink-0 dropdown mr-15">
        </div>
      </nav>

      <nav aria-label="breadcrumb" className="nav-padding bc-gray">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <IconB iconName='house-door'/>
            <a href="/" className="alert-link">
              Home
            </a>
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default NavBar;