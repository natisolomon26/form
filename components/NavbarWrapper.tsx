"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Don't render navbar on dashboard or admin pages
  const hideNavbar =
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin/signin') ||
    pathname?.startsWith('/admin/signup');

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}