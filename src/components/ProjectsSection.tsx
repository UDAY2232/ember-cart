import { motion } from "framer-motion";
import { Wrench, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Start Building Projects</h2>
            <p className="text-xs text-muted-foreground">Beginner-friendly projects to get you started</p>
          </div>
        </div>
        <Link to="/products" className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 w-[260px] bg-card rounded-xl border border-border overflow-hidden group"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <span className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full font-bold ${
                project.difficulty === "Beginner" ? "bg-success text-success-foreground" :
                project.difficulty === "Intermediate" ? "bg-primary text-primary-foreground" :
                "bg-deal text-deal-foreground"
              }`}>
                {project.difficulty}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Buy Components <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
