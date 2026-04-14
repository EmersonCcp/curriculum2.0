import { Link } from "react-router-dom";
import { Clock, Eye, Heart } from "lucide-react";

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  category: string;
  createdAt: string;
  views?: number;
  likes?: number;
}

export const BlogCard = ({ slug, title, summary, coverImage, category, createdAt, views = 0, likes = 0 }: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`} className="group block h-full">
      <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        {/* Image / Fallback */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/20">
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <span className="text-xl font-bold text-primary/40 font-mono tracking-tight">{title}</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-semibold rounded-full border border-border/50 text-foreground">
              {category || 'General'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-4">
            {summary}
          </p>
          
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground pt-4 border-t border-border/50 mt-auto">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {new Date(createdAt).toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {views}
              </span>
              <span className="flex items-center gap-1 text-red-500/80">
                <Heart className="w-3.5 h-3.5 fill-current" />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
