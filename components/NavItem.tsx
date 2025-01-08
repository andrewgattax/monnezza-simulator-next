import React, { ReactNode } from 'react';
import Link from 'next/link'
import IconB from './IconB'

interface NavItemProps {
  name?: string,
  icon?: string,
  href?: string,
}

const NavItem: React.FC<NavItemProps> = ({ href, name, icon }) => {
  if (href && name && icon) {
    return (
      <li>
        <Link className="dropdown-item" href={href}>
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