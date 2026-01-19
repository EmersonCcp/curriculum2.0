import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AllProjects = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Todos los Proyectos
          </h1>
          <p className="text-lg text-muted-foreground">
            Explora toda mi colección de proyectos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...projects]
            .sort((a, b) => Number(b.year) - Number(a.year))
            .map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                year={project.year}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
