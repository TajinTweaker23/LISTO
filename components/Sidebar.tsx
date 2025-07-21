import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Compass, Sparkles, Settings, User, Calendar } from 'lucide-react'; // Import Calendar
import Logo from './Logo';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/vision-board', label: 'Vision Board', icon: Sparkles },
  { href: '/calendar', label: 'Calendar', icon: Calendar }, // Add this line
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-64 h-screen overflow-hidden text-sage-200 bg-dark-ui shadow-lg">
      <div className="flex items-center w-full px-3 mt-3">
        <Logo className="w-full h-12 text-sage-100" />
      </div>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-sage-700">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <a
                className={`flex items-center w-full h-12 px-3 mt-2 rounded transition-colors duration-200 ${
                  router.pathname === item.href
                    ? 'bg-primary text-white'
                    : 'hover:bg-medium hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6 stroke-current" />
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/account">
        <a className="flex items-center justify-center w-full h-16 mt-auto bg-medium hover:bg-primary hover:text-white transition-colors duration-200">
          <User className="w-6 h-6 stroke-current" />
          <span className="ml-2 text-sm font-medium">Account</span>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;