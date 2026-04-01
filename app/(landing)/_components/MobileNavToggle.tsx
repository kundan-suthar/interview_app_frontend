/**
 * @component MobileNavToggle
 * @type Client Component
 * @description Hamburger menu toggle and mobile navigation drawer.
 */
"use client";
import { usePathname } from "next/navigation";

import { useState,useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { CTAButton } from './CTAButton';
import Link from "next/link";


export const MobileNavToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
  setIsOpen(false); // reset on route change
}, [pathname]);
  return (
    <div className="md:hidden flex items-center">
      <button 
        className="text-[var(--on-surface)] p-2 hover:bg-[var(--surface-container-low)] rounded-[var(--radius-default)]"
        onClick={() => {
          setIsOpen(prev => {
            console.log("isOpen", prev);
            return !prev;
          });
        }}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[var(--surface-container)]/95 backdrop-blur-[20px] p-6 flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-[var(--outline-variant)]/15">
          <nav className="flex flex-col gap-4 text-[length:var(--body-lg)] text-[var(--font-body)]">
            <a href="#features" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">Features</a>
            <a href="#how-it-works" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">How It Works</a>
            <a href="#pricing" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors">Pricing</a>
          </nav>
          <div className="flex flex-col gap-4 mt-4 border-t border-[var(--outline-variant)]/15 pt-6">
            {/* <CTAButton href="/login" variant="tertiary" className="w-full text-center py-3">Sign In</CTAButton> */}
           <Link href="/login">Sign In</Link>
           <CTAButton href='/register' variant="primary" className="w-full text-center py-3">Get Started</CTAButton>
          </div>
        </div>
      )}
    </div>
  );
};
