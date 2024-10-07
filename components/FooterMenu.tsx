'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, HeartIcon, AvatarIcon } from '@radix-ui/react-icons';

const FooterMenu = ({ className }: { className: string }) => {
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
        {/* Utforsk */}
        <Link href="/min-side">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <HomeIcon className={`w-6 h-6 ${pathname === '/min-side' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/min-side' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>Min side</span>
          </div>
        </Link>

        {/* Logg inn */}
        <Link href="/sign-in">
          <div className="flex flex-col items-center cursor-pointer min-w-20">
            <AvatarIcon className={`w-6 h-6 ${pathname === '/sign-in' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`} />
            <span className={`mt-1 text-xs ${pathname === '/sign-in' ? 'text-white-500 font-medium' : 'text-gray-500 font-light'}`}>{pathname === '/sign-in' ? "Logg inn" : "Profil"}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default FooterMenu;