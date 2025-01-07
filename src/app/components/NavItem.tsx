import React, { ReactNode } from 'react';
import Link from 'next/link'
import IconB from '../components/IconB'

interface NavItemProps {
  name: string,
  icon: string,
  href: string,
}

const NavItem: React.FC<NavItemProps> = ({ href, name, icon }) => {
  return (
    <li>
      <Link className="dropdown-item" href={href}>
        <IconB iconName={icon} />
        {name}
      </Link>
    </li>
  );
}

export default NavItem;