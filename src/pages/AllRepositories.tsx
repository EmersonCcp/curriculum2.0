import { RepositoryCard } from "../components/RepositoryCard";
import { repositories } from "../data/repositories";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AllRepositories = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16 mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Todos los Repositorios
          </h1>
          <p className="text-lg text-muted-foreground">
            Explora todos mis repositorios en GitHub
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <RepositoryCard
              key={repo.id}
              id={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRepositories;
