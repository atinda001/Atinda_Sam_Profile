import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Project, Content } from "@shared/schema";

interface ContentSectionsProps {
  activeSection: string;
  projects: Project[];
  featuredProjects: Project[];
  infoContent: Content[];
}

export function ContentSections({ 
  activeSection, 
  projects, 
  featuredProjects, 
  infoContent 
}: ContentSectionsProps) {
  const [displayContent, setDisplayContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Smooth transition animation
    setDisplayContent(null);
    const timer = setTimeout(() => {
      setDisplayContent(renderContent());
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection, projects, featuredProjects, infoContent]);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection featuredProjects={featuredProjects} />;
      case "projects":
        return <ProjectsSection projects={projects} />;
      case "info":
        return <InfoSection infoContent={infoContent} />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection featuredProjects={featuredProjects} />;
    }
  };

  return (
    <div className={`transition-all duration-300 ${
      displayContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}>
      {displayContent}
    </div>
  );
}

function HomeSection({ featuredProjects }: { featuredProjects: Project[] }) {
  return (
    <div className="space-y-8">
      <div className="mb-12">
        <h2 className="text-4xl font-light mb-4 text-accent">Kenyan Roots, Global Aspirations</h2>
        <p className="text-lg leading-relaxed max-w-3xl">
          A multidisciplinary African creative specializing in development, design, and education. 
          I celebrate and amplify voices and stories that resonate with African narratives while 
          building bridges to global audiences.
        </p>
      </div>
      
      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <ProjectLink key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectLink key={project.id} project={project} large />
      ))}
    </div>
  );
}

function InfoSection({ infoContent }: { infoContent: Content[] }) {
  return (
    <div className="max-w-2xl space-y-6">
      {infoContent.map((content) => (
        <div key={content.id}>
          <p className="text-lg leading-relaxed">
            {content.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const socialLinks = [
    { name: "X(Twitter)", url: "https://twitter.com/samsonatinda" },
    { name: "Instagram", url: "https://instagram.com/samsonatinda" },
    { name: "LinkedIn", url: "https://linkedin.com/in/samsonatinda" },
    { name: "GitHub", url: "https://github.com/samsonatinda" },
    { name: "Spotify", url: "https://spotify.com/samsonatinda" },
  ];

  const contactInfo = [
    { name: "hello@samsonatinda.com", url: "mailto:hello@samsonatinda.com" },
    { name: "Resume Download", url: "/resume.pdf" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-70 transition-opacity duration-200"
          >
            {link.name} ↗
          </a>
        ))}
      </div>
      
      <div className="space-y-2">
        {contactInfo.map((info) => (
          <a
            key={info.name}
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-70 transition-opacity duration-200"
          >
            {info.name} ↗
          </a>
        ))}
      </div>
      
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>Available for freelance projects</p>
        <p>Open to speaking engagements</p>
        <p>Mentorship opportunities welcome</p>
      </div>
    </div>
  );
}

function ProjectLink({ project, large = false }: { project: Project; large?: boolean }) {
  const handleClick = () => {
    if (project.url && project.url !== "#") {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer hover:opacity-70 transition-opacity duration-200 ${
        project.url === "#" ? "cursor-default" : ""
      }`}
    >
      <h3 className={`font-light mb-1 ${large ? "text-3xl" : "text-2xl"}`}>
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {project.date} / {project.role}
      </p>
    </div>
  );
}
