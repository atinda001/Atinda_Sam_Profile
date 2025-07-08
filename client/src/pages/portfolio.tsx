import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShaderBackground } from "@/components/shader-background";
import { Navigation } from "@/components/navigation";
import { ContentSections } from "@/components/content-sections";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import type { Project, Content } from "@shared/schema";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: featuredProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  const { data: infoContent = [] } = useQuery<Content[]>({
    queryKey: ["/api/content", "info"],
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <ShaderBackground />
      
      {/* Theme Switcher */}
      <div className="fixed top-5 right-5 z-50 flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            theme === "light" 
              ? "bg-foreground/20 text-foreground" 
              : "hover:bg-foreground/10 text-foreground/70"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            theme === "dark" 
              ? "bg-foreground/20 text-foreground" 
              : "hover:bg-foreground/10 text-foreground/70"
          }`}
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("monospaced")}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            theme === "monospaced" 
              ? "bg-foreground/20 text-foreground" 
              : "hover:bg-foreground/10 text-foreground/70"
          }`}
        >
          Monospaced
        </button>
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-foreground/10 rounded-lg"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex min-h-screen">
          {/* Left Sidebar */}
          <div className="w-1/4 min-h-screen p-8 border-r border-border/30 relative z-10">
            <div className="mb-8">
              <h1 className="font-playfair text-3xl font-medium mb-2">Samson Atinda</h1>
              <p className="text-sm text-muted-foreground font-inter">Designer & Developer</p>
            </div>
            
            <Navigation 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange}
            />
            
            <div className="absolute bottom-8 left-8 text-xs text-muted-foreground">
              © Samson Atinda
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="w-3/4 p-8 relative z-10">
            <ContentSections 
              activeSection={activeSection}
              projects={projects}
              featuredProjects={featuredProjects}
              infoContent={infoContent}
            />
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          {/* Mobile Sidebar */}
          <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm">
              <div className="p-8 pt-16">
                <div className="mb-8">
                  <h1 className="font-playfair text-3xl font-medium mb-2">Samson Atinda</h1>
                  <p className="text-sm text-muted-foreground font-inter">Designer & Developer</p>
                </div>
                
                <Navigation 
                  activeSection={activeSection} 
                  onSectionChange={handleSectionChange}
                />
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="pt-16 p-6 relative z-10">
            <ContentSections 
              activeSection={activeSection}
              projects={projects}
              featuredProjects={featuredProjects}
              infoContent={infoContent}
            />
          </div>
        </>
      )}
    </div>
  );
}
