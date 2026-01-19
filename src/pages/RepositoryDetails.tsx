import { useParams, Link } from "react-router-dom";
import { repositories } from "../data/repositories";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Github, Star, GitFork, Eye } from "lucide-react";

const RepositoryDetails = () => {
  const { id } = useParams();
  const repository = repositories.find((repo) => repo.id === id);

  if (!repository) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Repositorio no encontrado</h1>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {repository.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {repository.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-5 w-5" />
                <span>{repository.stars} estrellas</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitFork className="h-5 w-5" />
                <span>{repository.forks} forks</span>
              </div>
              {repository.watchers && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-5 w-5" />
                  <span>{repository.watchers} watchers</span>
                </div>
              )}
              <Badge variant="secondary">{repository.language}</Badge>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Descripción completa</h2>
              <p className="text-muted-foreground leading-relaxed">
                {repository.fullDescription}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Características principales
              </h2>
              <ul className="space-y-2">
                {repository.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Tecnologías</h2>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic) => (
                  <Badge key={topic} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {repository.githubUrl && (
              <div className="flex gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href={repository.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    Ver en GitHub
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetails;
