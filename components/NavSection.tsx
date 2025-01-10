import React, { ReactNode } from 'react';
import IconB from './IconB'
import styles from "../styles/NavSection.module.css"

interface NavSectionProps {
  children: ReactNode,
  name: string,
  icon: string,
}

const NavSection: React.FC<NavSectionProps> = ({ children, name, icon }) => {
  return (
    <li className={`nav-item dropdown ${styles.navsec}`}>
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <IconB iconName={icon} />
        {name}
      </a>
      <ul className="dropdown-menu">
        {children}
      </ul>
    </li>
  );
}

export default NavSection;