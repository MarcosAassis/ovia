import { Suspense } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Insights } from "@/components/Insights";
import { Pillars } from "@/components/Pillars";
import { Solutions } from "@/components/Solutions";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Pillars />
        <About />
        <Insights />
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
