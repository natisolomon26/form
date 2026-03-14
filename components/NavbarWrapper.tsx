"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't render navbar and footer on dashboard or admin pages
  const hideLayout =
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin/signin') ||
    pathname?.startsWith('/admin/signup');

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}