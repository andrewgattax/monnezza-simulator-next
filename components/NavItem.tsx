import React, { ReactNode } from 'react';
import Link from 'next/link'
import IconB from './IconB'

interface NavItemProps {
  name?: string,
  icon?: string,
  href?: string,
  disabled?: boolean,
  onClick?: (e: any) => void
}

const NavItem: React.FC<NavItemProps> = ({ href, name, icon, disabled, onClick }) => {
  if (href && name && icon) {
    return (
      <li>
        <Link onClick={onClick} className={`dropdown-item ${disabled ? "disabled" : ""}`} href={href} >
          <IconB iconName={icon} />
          {name}
        </Link>
      </li>
    );
  } else {
    // spacer
    return (
      <li>
        <hr className="dropdown-divider" />
      </li>
    );
  }
}

export default NavItem;