import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, PenSquare, Trash2, Edit2 } from "lucide-react";
import { getAdminBlogs, deleteBlog } from "../../lib/blogs";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getAdminBlogs();
      setBlogs(data);
    } catch (error: any) {
      toast.error("Error cargando los blogs: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este artículo? Esta acción es irreversible.")) {
      try {
        await deleteBlog(id);
        toast.success("Blog eliminado correctamente");
        fetchBlogs();
      } catch (error: any) {
        toast.error("Error al eliminar: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Panel de Control
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline-block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          
          {/* Create Blog Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              <PenSquare className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Crear Blog</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Escribe un nuevo artículo para tu portafolio o blog personal.
            </p>
            <Button className="w-full" onClick={() => navigate("/admin/blogs/create")}>
              Nuevo Artículo
            </Button>
          </div>

        </div>

        {/* Blogs List */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Mis Artículos</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Título</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Estado</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Fecha</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Cargando artículos...</td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No hay artículos creados aún.</td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{blog.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded-md">{blog.categories?.name || 'General'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {blog.published ? "Publicado" : "Borrador"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)} title="Editar Post">
                          <Edit2 className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)} title="Eliminar">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
