import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code, Cpu, Lightbulb, Copy, Check } from "lucide-react";
import { productLearningData } from "@/data/projects";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const tabs = [
  { id: "video", label: "Video Tutorial", icon: Play },
  { id: "code", label: "Code", icon: Code },
  { id: "circuit", label: "Circuit Diagram", icon: Cpu },
  { id: "projects", label: "Projects", icon: Lightbulb },
] as const;

type TabId = (typeof tabs)[number]["id"];

const LearnBeforeYouBuy = ({ productId }: { productId: string }) => {
  const data = productLearningData[productId];
  const [activeTab, setActiveTab] = useState<TabId>("video");
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const relatedProjects = projects.filter((p) => data.relatedProjects.includes(p.id));

  const handleCopy = () => {
    navigator.clipboard.writeText(data.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Learn Before You Buy</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
              activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="learn-tab-bg"
                className="absolute inset-0 bg-card rounded-lg shadow-sm"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          {activeTab === "video" && (
            <div className="aspect-video">
              <iframe
                src={data.videoUrl}
                title={data.videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {activeTab === "code" && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground uppercase">{data.codeLanguage}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground leading-relaxed">
                <code>{data.codeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === "circuit" && (
            <div className="p-4">
              <img
                src={data.circuitImage}
                alt="Circuit Diagram"
                className="w-full rounded-lg max-h-[400px] object-cover"
              />
              <p className="text-sm text-muted-foreground mt-3">
                Reference circuit diagram for this product. Use this as a guide for your projects.
              </p>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="p-4 grid sm:grid-cols-2 gap-4">
              {relatedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted rounded-xl overflow-hidden border border-border"
                >
                  <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{project.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        project.difficulty === "Beginner" ? "bg-success/10 text-success" :
                        project.difficulty === "Intermediate" ? "bg-primary/10 text-primary" :
                        "bg-deal/10 text-deal"
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                    <Link
                      to="/products"
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Buy Components →
                    </Link>
                  </div>
                </motion.div>
              ))}
              {relatedProjects.length === 0 && (
                <p className="text-sm text-muted-foreground col-span-2 text-center py-8">
                  No related projects yet. Check back soon!
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default LearnBeforeYouBuy;
