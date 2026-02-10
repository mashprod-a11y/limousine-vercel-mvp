import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import PickupPoints from "@/components/PickupPoints";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-inkBlack text-white selection:bg-amberFlame selection:text-inkBlack">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <PickupPoints />
      <Gallery />
      <BookingForm />
      <FAQ />
      <Footer />
    </main>
  );
}
