import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import WhySection from "@/components/WhySection";
import TerminalPreview from "@/components/TerminalPreview";
import Community from "@/components/Community";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <TerminalPreview />
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="glow-line" />
      </div>
      <Features />
      <WhySection />
      <Community />
      <FinalCTA />
      <Footer />
    </>
  );
}
