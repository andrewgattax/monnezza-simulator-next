import '../styles/NavBar.css'
import LogoSoftware from '../images/full-logo.svg'

import React, { ReactNode } from 'react';
import Image from 'next/image'
import Link from 'next/link'

interface NavBarProps {
  children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-padding nav-gray">
        <div className="container-fluid">
          <Link className="logocustom" href="/">
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
        <div className="flex-shrink-0 dropdown mr-15">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle bl" 
            data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://www.gravatar.com/avatar/4072386ac5856a7da9aef2aa911fed1d?s=32&amp;d=mp"
                  alt="profile picture" width="30" height="30" className="rounded-circle mtb5" />
              <span className="username">vitto</span>
          </a>
          <ul className="dropdown-menu text-small shadow customDropDown" data-popper-placement="bottom-end">
              <li><a className="dropdown-item disabled" href="#">
                      <i className="bi bi-person spo"></i>
                      Vittorio Lo Mele </a></li>
              <li><a className="dropdown-item disabled" href="#">
                      <i className="bi bi-envelope-at spo"></i>
                      hi@vitto.dev </a></li>
              <li>
                  <hr className="dropdown-divider" />
              </li>
              <li><a className="dropdown-item" href="/logout.php">
                      <i className="bi bi-box-arrow-right spo"></i>
                      Esci
                  </a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;