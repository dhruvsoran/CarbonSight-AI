import AiFeatures from "@/components/landing/ai-features";
import DashboardMockup from "@/components/landing/dashboard-mockup";
import DataPreview from "@/components/landing/data-preview";
import Hero from "@/components/landing/hero";
import ProblemSection from "@/components/landing/problem-section";
import SolutionSection from "@/components/landing/solution-section";
import UspSection from "@/components/landing/usp-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DataPreview />
        <DashboardMockup />
        <AiFeatures />
        <UspSection />
      </main>
      <Footer />
    </div>
  );
}
