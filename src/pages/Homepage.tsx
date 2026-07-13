import { Header } from "../components/marketing/Header";
import { Hero } from "../components/marketing/Hero";
import { WhyMomentum } from "../components/marketing/WhyMomentum";
import { ShowcaseTabs } from "../components/marketing/ShowcaseTabs";
import { Pillars } from "../components/marketing/Pillars";
import { HowItWorks } from "../components/marketing/HowItWorks";
import { ClosingCTA } from "../components/marketing/ClosingCTA";
import { Footer } from "../components/marketing/Footer";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <WhyMomentum />
      <ShowcaseTabs />
      <Pillars />
      <HowItWorks />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
