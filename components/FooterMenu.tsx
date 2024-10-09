'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, CarIcon, CircleUser, Home } from 'lucide-react';
import { User } from '@supabase/auth-js';

interface FooterMenuProps {
  className: string;
  user: User | null;
}

const FooterMenu = ({ className, user }: FooterMenuProps) => {
    const [showFooter, setShowFooter] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 200) {
          setShowFooter(false);
        } else {
          setShowFooter(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <nav className={`${className} fixed bottom-0 w-full bg-black border-t border-t-foreground/10 ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex justify-evenly py-2.5">

        {/* Hjem */}
        <Link href="/">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <Calculator className={`w-6 h-6 ${pathname === '/' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>Beregn</span>
          </div>
        </Link>

        {/* Sammenligning */}
        {user ? 
        <Link href="/sammenlign">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <CarIcon className={`w-6 h-6 ${pathname === '/sammenlign' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/sammenlign' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>Sammenlign</span>
          </div>
        </Link> : null}

        {/* Logg inn / Profil */}
        {user ? 
        <Link href="/profil">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <CircleUser className={`w-6 h-6 ${pathname === '/profil' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/profil' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>Profil</span>
          </div> 
        </Link>
          :
        <Link href="/logg-inn">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <CircleUser className={`w-6 h-6 ${pathname === '/logg-inn' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/logg-inn' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>Logg inn</span>
          </div>
        </Link>}
      </div>
    </nav>
  );
};

export default FooterMenu;