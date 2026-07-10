// src/pages/Homepage.tsx
import { Header } from "../components/marketing/Header";
import { Hero } from "../components/marketing/Hero";
import { ProblemFraming } from "../components/marketing/ProblemFraming";
import { BoardPreview } from "../components/marketing/BoardPreview";
import { TablePreview } from "../components/marketing/TablePreview";
import { NotesPreview } from "../components/marketing/NotesPreview";
import { HowItWorks } from "../components/marketing/HowItWorks";
import { ClosingCTA } from "../components/marketing/ClosingCTA";
import { Footer } from "../components/marketing/Footer";
import { FeatureSection } from "../components/marketing/FeatureSection";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <ProblemFraming />

      <div id="features" className="bg-surface">
        <FeatureSection
          eyebrow="Board view"
          title="Drag, drop, done."
          description="Move applications between stages as things change. See your whole pipeline at a glance, organized exactly the way you think about it."
        >
          <BoardPreview />
        </FeatureSection>
      </div>

      <FeatureSection
        eyebrow="Table view"
        title="Every detail, sortable."
        description="Switch to a dense table when you need to scan, sort, or search across everything at once."
        reverse
      >
        <TablePreview />
      </FeatureSection>

      <div className="bg-surface">
        <FeatureSection
          eyebrow="Notes and interviews"
          title="Never lose the thread."
          description="Every note and every interview stays attached to the application it belongs to, opening right where you are."
        >
          <NotesPreview />
        </FeatureSection>
      </div>

      <HowItWorks />
      <ClosingCTA />
      <Footer />
    </div>
  );
}