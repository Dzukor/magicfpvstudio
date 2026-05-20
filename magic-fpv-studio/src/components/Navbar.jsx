'use client'; // bo używa usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isServicesPage = pathname === '/services' || pathname === '/form';

  return (
    <nav className="nav">
      <Link href="../#top" className="logo">
        <img src="/photos/Logo.png" alt="Magic FPV Studio logo" />
      </Link>

      <div className="nav-links">
        <a href={isServicesPage ? "/#about" : "#about"}>About</a>
        <a href={isServicesPage ? "/#portfolio" : "#portfolio"}>Portfolio</a>
        <a href={isServicesPage ? "/#socials" : "#socials"}>Socials</a>
        <Link href="/services">Services</Link>
        <Link href="/form">Book now</Link>
        <a href={isServicesPage ? "/#contact" : "#contact"}>Contact</a>
      </div>
    </nav>
  );
}