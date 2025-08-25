
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const baseLinkClasses = 'flex items-center gap-3 rounded-md px-3 py-2 text-subtext transition-all hover:text-text hover:bg-muted';
  const activeLinkClasses = 'bg-muted text-text';

  return (
    <div className="hidden border-r border-muted bg-surface md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-muted px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-text">
            <Rocket className="h-6 w-6 text-accent" />
            <span>MoneyQuest</span>
          </NavLink>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
