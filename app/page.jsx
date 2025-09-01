import Nav from "@/Components/Nav";
import Image from "next/image";
import '@/app/globals.css'
import Faq from "@/Components/Utility/Accordion";
import FooterClient from "@/Components/FooterClient";
import HeroSection from "@/Components/HeroSection";
import Newsletter from "@/Components/Newsletter";

export default function Home() {
  return (
    <div>
      <Nav />
      <HeroSection />
      <Newsletter />
      <Faq />
      <FooterClient />
    </div>
  );
}
