import { MotionProvider } from "@/components/MotionProvider";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import { ClientMarquee, Stats } from "@/components/landing/Proof";
import Services from "@/components/landing/Services";
import Method from "@/components/landing/Method";
import { CaseStudies, Testimonials } from "@/components/landing/Work";
import { Contact, FAQ, Footer } from "@/components/landing/Closing";

export default function Home() {
  return (
    <MotionProvider>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ClientMarquee />
        <Stats />
        <Services />
        <Method />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
