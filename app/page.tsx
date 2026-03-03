import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Mission } from "@/components/Mission";
import Navbar
 from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <Impact />
      <CTA />
      <Footer />
    </main>
  );
}