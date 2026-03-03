import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main>
      <Hero backgroundImage="images/bg-5.jpg" />
      <Mission />  
      <Features />
    </main>
  );
}