import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "./components/ui/tooltip";
import AllProjects from "./pages/AllProjects";
import AllRepositories from "./pages/AllRepositories";
import RepositoryDetails from "./pages/RepositoryDetails";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import CreateBlog from "./pages/admin/CreateBlog";
import BlogDetails from "./pages/BlogDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/repositories" element={<AllRepositories />} />
            <Route path="/repository/:id" element={<RepositoryDetails />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/blogs/create" element={<CreateBlog />} />
              <Route path="/admin/blogs/edit/:id" element={<CreateBlog />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
