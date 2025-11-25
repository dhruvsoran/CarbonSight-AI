import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

const techStack = [
  {
    category: "Frontend Framework",
    name: "Next.js",
    description: "The application is built with Next.js, a powerful React framework that enables features like server-side rendering and static site generation for high performance and SEO.",
  },
  {
    category: "JavaScript Library",
    name: "React",
    description: "At its core, the app uses React to build a dynamic and component-based user interface, allowing for efficient state management and reusable UI elements.",
  },
  {
    category: "Language",
    name: "TypeScript",
    description: "The entire codebase is written in TypeScript, a statically typed superset of JavaScript that enhances developer productivity and helps prevent common bugs.",
  },
  {
    category: "Styling",
    name: "Tailwind CSS",
    description: "Styling is handled with Tailwind CSS, a utility-first CSS framework that allows for rapid and consistent UI development directly within the markup.",
  },
  {
    category: "UI Components",
    name: "ShadCN UI",
    description: "The user interface is built using ShadCN UI, a collection of beautifully designed and accessible components that are easily customizable.",
  },
  {
    category: "AI & Generative Features",
    name: "Google Genkit",
    description: "The AI-powered features, such as the carbon estimator and report generator, are implemented using Genkit, a framework for building production-ready AI applications.",
  },
  {
    category: "Icons",
    name: "Lucide React",
    description: "The application uses Lucide React for its icon library, providing a clean, consistent, and highly customizable set of SVG icons.",
  },
   {
    category: "Charting",
    name: "Recharts",
    description: "The interactive charts and graphs on the dashboard are created with Recharts, a composable charting library built on React components.",
  },
];

export default function TechStackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tighter">
              Technology <span className="text-primary">Stack</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
              A breakdown of the modern technologies used to build CarbonSight AI.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techStack.map((tech) => (
                <div key={tech.name} className="p-6 rounded-lg border bg-card shadow-lg hover:shadow-primary/20 transition-shadow">
                   <p className="text-sm font-semibold text-primary">{tech.category}</p>
                   <h3 className="text-2xl font-bold mt-2">{tech.name}</h3>
                   <p className="mt-3 text-muted-foreground">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
