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
    <div className="space-y-16 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="font-playfair text-6xl font-medium mb-6 leading-tight">
            I build.<br />
            I speak.<br />
            I design.
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl opacity-80">
            Multidisciplinary African creative bridging tradition with innovation.
          </p>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          <p className="text-lg leading-relaxed">
            Born in Kenya, rooted in African storytelling, driven by global possibilities. 
            Every pixel, every line of code, every word carries the weight of heritage 
            and the lightness of dreams.
          </p>
          <p className="text-lg leading-relaxed opacity-70">
            Through development, design, and education, I create digital experiences 
            that honor our past while building our future.
          </p>
        </div>
      </div>
      
      <div className="pt-8">
        <h3 className="font-playfair text-2xl mb-6 opacity-60">Featured Work</h3>
        <div className="space-y-4">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectLink key={project.id} project={project} featured />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-12 py-8">
      <h2 className="font-playfair text-5xl font-medium mb-12">
        Creative<br />
        Expressions
      </h2>
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectLink key={project.id} project={project} large />
        ))}
      </div>
    </div>
  );
}

function InfoSection({ infoContent }: { infoContent: Content[] }) {
  return (
    <div className="space-y-16 py-8">
      <div className="space-y-12">
        <div>
          <h2 className="font-playfair text-5xl font-medium mb-8">
            Stories from<br />
            the Heart of Africa
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-playfair text-2xl mb-4 text-accent">Origin</h3>
              <p className="text-lg leading-relaxed">
                Born in 1994 in Nairobi, Kenya. Raised where acacia trees meet digital dreams, 
                where Ubuntu philosophy shapes user experience, and where the rhythm of 
                traditional drums guides the flow of modern interfaces.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-2xl mb-4 text-accent">Philosophy</h3>
              <p className="text-lg leading-relaxed">
                I believe web design can be more diverse and inspiring when it carries 
                the weight of authentic stories. Every project is a canvas for celebrating 
                African narratives in the digital space.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-playfair text-2xl mb-4 text-accent">Mission</h3>
              <p className="text-lg leading-relaxed">
                To amplify African voices in technology and design. To build bridges between 
                traditional wisdom and digital innovation. To mentor the next generation 
                of African creatives who will shape our digital future.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-2xl mb-4 text-accent">Vision</h3>
              <p className="text-lg leading-relaxed">
                A future where African creativity leads global design conversations. 
                Where our stories aren't just told, but experienced through 
                immersive digital landscapes that honor our heritage.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-accent pl-6 max-w-3xl">
          <p className="font-playfair text-2xl italic leading-relaxed">
            "Ubuntu ngumuntu ngabantu" — I am because we are. 
            In every line of code, every design decision, every mentorship moment, 
            this philosophy guides my work toward collective elevation.
          </p>
          <p className="text-sm opacity-60 mt-4">Traditional African philosophy</p>
        </div>
      </div>
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
    <div className="space-y-16 py-8">
      <div>
        <h2 className="font-playfair text-5xl font-medium mb-8">
          Let's Create<br />
          Together
        </h2>
        <p className="text-xl leading-relaxed max-w-2xl opacity-80">
          Ready to build something extraordinary? Whether it's a groundbreaking project, 
          a speaking opportunity, or mentorship, I'd love to connect.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="font-playfair text-2xl mb-6 text-accent">Digital Spaces</h3>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-70 transition-opacity duration-200 text-lg"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-playfair text-2xl mb-6 text-accent">Direct Contact</h3>
          <div className="space-y-3">
            {contactInfo.map((info) => (
              <a
                key={info.name}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-70 transition-opacity duration-200 text-lg"
              >
                {info.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-l-4 border-accent pl-6 space-y-2">
        <p className="text-lg font-medium">Currently Open For:</p>
        <div className="space-y-1 text-muted-foreground">
          <p>• Freelance design & development projects</p>
          <p>• Speaking engagements on African tech & design</p>
          <p>• Mentorship opportunities for emerging creatives</p>
          <p>• Collaborative initiatives celebrating African innovation</p>
        </div>
      </div>
    </div>
  );
}

function ProjectLink({ project, large = false, featured = false }: { project: Project; large?: boolean; featured?: boolean }) {
  const handleClick = () => {
    if (project.url && project.url !== "#") {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer hover:opacity-70 transition-all duration-300 ${
        project.url === "#" ? "cursor-default" : ""
      } ${featured ? "border-l-2 border-accent/30 pl-4" : ""}`}
    >
      <h3 className={`font-playfair font-medium mb-2 ${
        large ? "text-4xl" : featured ? "text-2xl" : "text-xl"
      }`}>
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground font-inter">
        {project.date} / {project.role}
      </p>
      {project.description && large && (
        <p className="text-base mt-2 opacity-70 max-w-2xl">
          {project.description}
        </p>
      )}
    </div>
  );
}
