import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogBySlug, incrementViews, incrementLikes } from "../lib/blogs";
import { Button } from "../components/ui/button";
import { ArrowLeft, Clock, Tag, Heart, Eye, Share2, Twitter, Linkedin, MessageCircle, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import "react-quill-new/dist/quill.snow.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
        // Incrementar vistas de forma silenciosa
        incrementViews(slug);
      } catch (error) {
        console.error("Error cargando blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleLike = async () => {
    if (liked || !blog) return;
    try {
      await incrementLikes(blog.id);
      setBlog({ ...blog, likes_count: (Number(blog.likes_count) || 0) + 1 });
      setLiked(true);
      toast.success("¡Me alegra que te haya gustado!");
    } catch (error: any) {
      toast.error("Error al procesar el like");
    }
  };

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog?.title || "")}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent((blog?.title || "") + " " + window.location.href)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("¡Enlace copiado al portapapeles!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <p className="text-xl text-gray-500 animate-pulse">Cargando artículo...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 space-y-4">
        <p className="text-xl text-gray-800">No se encontró el artículo deseado.</p>
        <Button onClick={() => navigate("/")}>Volver al Inicio</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* Dynamic Header */}
      <div className="relative w-full h-[400px] sm:h-[500px] flex items-end">
        {blog.cover_image ? (
          <img src={blog.cover_image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="relative container mx-auto px-4 pb-12 z-10">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-white/20 mb-6 gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-900 uppercase bg-blue-100 rounded-full">
            {blog.categories?.name || 'General'}
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-4xl tracking-tight leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm font-medium">
            <span className="flex items-center gap-1.5 opacity-90">
              <Clock className="w-4 h-4" />
              {new Date(blog.created_at).toLocaleDateString(undefined, { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Eye className="w-4 h-4" />
              {blog.views_count || 0} vistas
            </span>
            <span className="flex items-center gap-1.5 opacity-90">
              <Heart className="w-4 h-4" />
              {blog.likes_count || 0} likes
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-12 -mt-24 relative z-20">
            
          {/* Summary */}
          {blog.summary && (
            <div className="text-xl text-gray-600 font-medium leading-relaxed mb-10 pb-10 border-b border-gray-100">
              {blog.summary}
            </div>
          )}

          {/* Render Quill Content */}
          <div 
            className="ql-editor prose prose-blue sm:prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4" />
                Etiquetas
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interaction Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">¿Te gustó el artículo?</p>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLike}
                disabled={liked}
                className={`gap-2 h-14 px-8 rounded-full transition-all duration-300 ${liked ? 'bg-red-50 text-red-500 border-red-100 shadow-inner' : 'hover:border-red-200 hover:bg-red-50/50 hover:text-red-500 hover:shadow-lg hover:-translate-y-1'}`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 animate-pulse' : ''}`} />
                <span className="text-lg font-bold">
                  {liked ? "¡Gracias!" : "¡Dar Like!"}
                </span>
                <span className="ml-1 opacity-60">({blog.likes_count || 0})</span>
              </Button>
            </div>

            <div className="flex flex-col iems-center gap-4 w-full">
              <div className="flex items-center gap-4 w-full">
                <div className="h-px bg-gray-100 flex-grow" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Share2 className="w-3 h-3" />
                  Compartir
                </span>
                <div className="h-px bg-gray-100 flex-grow" />
              </div>
              
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" size="icon" 
                  className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  onClick={() => window.open(shareLinks.linkedin, '_blank')}
                  title="Compartir en LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" size="icon" 
                  className="rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200"
                  onClick={() => window.open(shareLinks.twitter, '_blank')}
                  title="Compartir en Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" size="icon" 
                  className="rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                  onClick={() => window.open(shareLinks.whatsapp, '_blank')}
                  title="Compartir en WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" size="icon" 
                  className="rounded-full hover:bg-gray-100 hover:text-gray-900 border-dashed"
                  onClick={copyToClipboard}
                  title="Copiar enlace"
                >
                  <LinkIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default BlogDetails;
