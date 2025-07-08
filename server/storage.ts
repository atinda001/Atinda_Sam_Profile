import { projects, content, type Project, type Content, type InsertProject, type InsertContent, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods (keeping existing interface)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Content methods
  getContentBySection(section: string): Promise<Content[]>;
  getAllContent(): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private content: Map<number, Content>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentContentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.content = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContentId = 1;
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize projects
    const defaultProjects: Omit<Project, 'id'>[] = [
      {
        title: "Fortune Kustoms",
        date: "Dec.2024",
        description: "A custom design and development project showcasing African-inspired aesthetics",
        url: "https://fortunekustoms.com",
        role: "Design & Dev",
        featured: true
      },
      {
        title: "Spotify Creative Campaign",
        date: "Nov.2024",
        description: "Creative direction for a music streaming platform campaign",
        url: "https://spotify.com",
        role: "Creative Direction",
        featured: true
      },
      {
        title: "African Design Systems",
        date: "Oct.2024",
        description: "Research and design of culturally-informed design systems",
        url: "#",
        role: "Design & Research",
        featured: true
      },
      {
        title: "EdTech Learning Platform",
        date: "Sep.2024",
        description: "Full-stack development of an educational technology platform",
        url: "#",
        role: "Full Stack Development",
        featured: true
      },
      {
        title: "Unity for Change",
        date: "Aug.2024",
        description: "Community platform promoting social unity and change",
        url: "#",
        role: "Community Platform",
        featured: false
      },
      {
        title: "Nairobi Innovation Hub",
        date: "Jul.2024",
        description: "UX design for innovation and entrepreneurship hub",
        url: "#",
        role: "UX Design",
        featured: false
      },
      {
        title: "Digital Storytelling Workshop",
        date: "Jun.2024",
        description: "Educational content creation for digital storytelling",
        url: "#",
        role: "Educational Content",
        featured: false
      },
      {
        title: "Afrofuturism AR Experience",
        date: "May.2024",
        description: "Interactive augmented reality experience exploring Afrofuturism",
        url: "#",
        role: "Interactive Design",
        featured: false
      }
    ];

    defaultProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });

    // Initialize content
    const defaultContent: Omit<Content, 'id'>[] = [
      {
        section: "info",
        title: "About",
        body: "Born and raised in Kenya, I am a multidisciplinary creative who bridges traditional African aesthetics with modern digital experiences. My work spans web development, UI/UX design, and educational technology.",
        order: 1
      },
      {
        section: "info",
        title: "Philosophy",
        body: "I believe web design can be more diverse and inspiring when it incorporates authentic African narratives and design principles. With a mission to present the possibilities of inclusive digital experiences, I am pursuing new expressions through experiments and cross-cultural collaborations.",
        order: 2
      },
      {
        section: "info",
        title: "Core Principles",
        body: "My philosophy centers on three core principles: I build to inspire, creating digital experiences that uplift and empower communities. I design to express, ensuring every interface tells a story rooted in authentic African creativity. I speak to empower, using education and mentorship to nurture the next generation of African creatives.",
        order: 3
      },
      {
        section: "info",
        title: "Vision",
        body: "Through my work, I aim to celebrate and amplify voices that resonate with African audiences while building bridges to global markets. Every project is an opportunity to showcase the rich diversity and innovation emerging from the African creative landscape.",
        order: 4
      }
    ];

    defaultContent.forEach(content => {
      const id = this.currentContentId++;
      this.content.set(id, { ...content, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      description: insertProject.description || null,
      url: insertProject.url || null,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }

  // Content methods
  async getContentBySection(section: string): Promise<Content[]> {
    return Array.from(this.content.values())
      .filter(content => content.section === section)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getAllContent(): Promise<Content[]> {
    return Array.from(this.content.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = this.currentContentId++;
    const content: Content = { 
      ...insertContent, 
      id,
      title: insertContent.title || null,
      order: insertContent.order || 0
    };
    this.content.set(id, content);
    return content;
  }
}

export const storage = new MemStorage();
