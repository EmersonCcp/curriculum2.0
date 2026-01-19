import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, GitFork } from "lucide-react";

interface RepositoryCardProps {
  id: string;
  name: string;
  description: string;
  language: string;
  stars?: number;
  forks?: number;
}

export const RepositoryCard = ({
  id,
  name,
  description,
  language,
  stars,
  forks,
}: RepositoryCardProps) => {
  return (
    <Link to={`/repository/${id}`}>
      <Card className="h-full hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:scale-105 cursor-pointer group">
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{forks}</span>
            </div>
          </div>
          <Badge variant="secondary">{language}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};
