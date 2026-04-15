import { ProjectCard } from "../components/ProjectCard";
import { RepositoryCard } from "../components/RepositoryCard";
import { projects } from "../data/projects";
import { repositories } from "../data/repositories";
import { Button } from "../components/ui/button";
import { Github, Linkedin, Mail, BookOpen, LogIn, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPublicBlogs } from "../lib/blogs";
import { BlogCard } from "../components/BlogCard";

import { SiExpress, SiNestjs, SiTypeorm, SiTypescript } from "react-icons/si";
import { FaAngular, FaReact } from "react-icons/fa";
import type { ReactNode } from "react";
import { RiNodejsLine, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import { IoLogoFirebase, IoLogoIonic } from "react-icons/io5";
import { FaFlutter } from "react-icons/fa6";

interface SkillCardProps {
  name: string;
  icon: ReactNode; // <- ahora acepta SVG/JSX
}

const SkillCard = ({ name, icon }: SkillCardProps) => (
  <div className="group flex flex-col items-center justify-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:scale-105">
    <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <p className="text-sm font-medium text-center">{name}</p>
  </div>
);

const Index = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const data = await getPublicBlogs(6); // Load latest 6 blogs max
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchLatestBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
        
        {/* Admin Login Button */}
        <div className="absolute top-6 right-6 z-50">
          <Button variant="ghost" size="sm" asChild className="gap-2 bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80">
            <Link to={user ? "/admin" : "/login"}>
              {user ? (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  Panel Control
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Acceso Admin
                </>
              )}
            </Link>
          </Button>
        </div>

        <div className="container relative px-4 py-24 mx-auto md:py-32">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h1 className="text-5xl font-bold text-transparent duration-1000 md:text-7xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text animate-in fade-in slide-in-from-bottom-4">
              Desarrollador Full Stack
            </h1>
            <p className="text-xl duration-1000 delay-200 md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4">
              Creando experiencias web excepcionales con tecnologías modernas
            </p>
            <div className="flex flex-wrap justify-center gap-4 duration-1000 delay-300 animate-in fade-in slide-in-from-bottom-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="#projects">Ver Proyectos</a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="mailto:emerson.paixao52@gmail.com">
                  <Mail className="w-4 h-4" />
                  Contactar
                </a>
              </Button>
            </div>
            <div className="flex justify-center gap-4 pt-4 duration-1000 delay-500 animate-in fade-in">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/EmersonCcp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/emerson-n-9a93a4a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Sobre mí</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Soy un desarrollador apasionado por crear soluciones web innovadoras
            y eficientes. Con experiencia en desarrollo frontend y backend, me
            especializo en construir aplicaciones escalables y centradas en el
            usuario utilizando las últimas tecnologías.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container px-4 py-16 mx-auto bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
            Tecnologías
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-center text-muted-foreground">
                Frontend
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <SkillCard name="Angular" icon={<FaAngular />} />
                <SkillCard name="React" icon={<FaReact />} />
                <SkillCard name="TypeScript" icon={<SiTypescript />} />
                <SkillCard name="Tailwind CSS" icon={<RiTailwindCssFill />} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-center text-muted-foreground">
                Backend
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <SkillCard name="Node.js" icon={<RiNodejsLine />} />
                <SkillCard name="Express" icon={<SiExpress />} />
                <SkillCard name="Nestjs" icon={<SiNestjs />} />
                <SkillCard name="TypeORM" icon={<SiTypeorm />} />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-center text-muted-foreground">
                Bases de Datos
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <SkillCard name="PostgreSQL" icon={<BiLogoPostgresql />} />
                <SkillCard name="MongoDB" icon={<DiMongodb />} />
                <SkillCard name="Firebase" icon={<IoLogoFirebase />} />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-center text-muted-foreground">
                Desarrollo Móvil
              </h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <SkillCard name="Ionic" icon={<IoLogoIonic />} />
                <SkillCard name="Flutter" icon={<FaFlutter />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container px-4 py-16 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Mis Proyectos</h2>
          <p className="text-lg text-muted-foreground">
            Algunos de los proyectos en los que he trabajado
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {[...projects]
            .sort((a, b) => Number(b.year) - Number(a.year))
            .slice(0, 6)
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

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/projects">Ver todos los proyectos</Link>
          </Button>
        </div>
      </section>

      {/* Blogs Section (If any exist) */}
      {blogs.length > 0 && (
        <section className="container px-4 py-16 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Mis Artículos
            </h2>
            <p className="text-lg text-muted-foreground">
              Compartiendo conocimiento, tutoriales y reflexiones
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                slug={blog.slug}
                title={blog.title}
                summary={blog.summary}
                coverImage={blog.cover_image}
                category={blog.categories?.name}
                createdAt={blog.created_at}
                views={blog.views_count}
                likes={blog.likes_count}
              />
            ))}
          </div>
        </section>
      )}

      {/* Repositories Section */}
      <section className="container px-4 py-16 mx-auto bg-secondary/20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Mis Repositorios
          </h2>
          <p className="text-lg text-muted-foreground">
            Proyectos open source en GitHub
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {repositories.slice(0, 3).map((repo) => (
            <RepositoryCard
              key={repo.id}
              id={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
            />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/repositories">Ver todos los repositorios</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-border">
        <div className="container px-4 py-8 mx-auto">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} - Desarrollado con ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
