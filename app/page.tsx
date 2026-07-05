import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Countdown from "@/components/landing/Countdown";
import Competition from "@/components/landing/Competition";
import Timeline from "@/components/landing/Timeline";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="relative pt-20 pb-0">
        <Countdown />
      </section>

      <Competition />

      <Timeline />
      <Footer />

    </>
  );
}