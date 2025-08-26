import Nav from "@/Components/Nav";
import Image from "next/image";
import '@/app/globals.css'
import Faq from "@/Components/Utility/Accordion";
import FooterClient from "@/Components/FooterClient";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="pt-[20vh]">
        <Faq />
      </div>
      <FooterClient />
    </div>
  );
}
