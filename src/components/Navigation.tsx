"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";
import { SITE_NAME } from "@/config/site";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Set mounted flag after client mount to prevent server/client hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close mobile menu on pathname change (render-phase update to avoid useEffect cascading renders)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Only apply open state when fully mounted on client to prevent server/client hydration mismatches
  const isMenuOpen = mounted && isOpen;

  // Lock body scroll when mobile menu is open (using fixed positioning for 100% iOS Safari compatibility)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        const savedScrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        if (savedScrollY) {
          const scrollPosition = parseInt(savedScrollY, 10) * -1;
          if (!isNaN(scrollPosition)) {
            window.scrollTo(0, scrollPosition);
          }
        }
      };
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Programs", href: "/programs" },
    { label: "Take Action", href: "/action" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (href: string) => {
    closeMenu();
    if (href === "/action" && typeof window !== "undefined") {
      window.dispatchEvent(new Event("reset-donation-form"));
    }
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
      <div className={`${styles.navContainer} container`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}></span>
          {SITE_NAME}
        </Link>

        <nav>
          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ""}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/action"
                className={`btn btn-primary ${styles.ctaBtn}`}
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}
                onClick={() => handleNavClick("/action")}
              >
                Donate Now
              </Link>
            </li>
          </ul>
        </nav>

        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Navigation Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
