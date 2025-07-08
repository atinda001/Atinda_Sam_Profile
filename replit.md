# Samson Atinda - 3D Portfolio Site

## Overview

This is a modern, interactive 3D portfolio website built for Samson Atinda, a multidisciplinary African creative specializing in development, design, and education. The site features a minimalist design with WebGL shader animations, inspired by https://p5aholic.me/projects, and showcases his work through an immersive 3D experience.

## System Architecture

### Frontend Architecture
- **React.js** with TypeScript for the user interface
- **Vite** as the build tool and development server
- **Wouter** for client-side routing
- **TailwindCSS** for styling with custom CSS variables for theming
- **Shadcn/ui** component library for consistent UI elements
- **Three.js** (loaded via CDN) for 3D graphics and WebGL rendering
- **React Query** for data fetching and caching

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design for data endpoints
- **In-memory storage** with future database migration support
- **Drizzle ORM** configured for PostgreSQL (ready for database integration)

### Component Structure
- Modular React components with clear separation of concerns
- Custom hooks for mobile detection and theme management
- Shared types and schemas between client and server
- Responsive design with mobile-first approach

## Key Components

### 1. 3D Canvas & Shaders
- **ShaderBackground**: WebGL fragment shader component for animated backgrounds
- Custom GLSL shaders for flow fields, generative patterns, and particle systems
- Three.js integration for 3D scene management

### 2. Navigation System
- **Navigation**: Clean, minimal navigation component
- **ContentSections**: Dynamic content rendering based on active section
- Mobile-responsive hamburger menu

### 3. Theme System
- **ThemeProvider**: Context-based theme management
- Support for light, dark, and monospaced themes
- CSS custom properties for dynamic theming

### 4. Portfolio Management
- **Projects API**: CRUD operations for portfolio projects
- **Content API**: Dynamic content management system
- Featured projects highlighting system

### 5. UI Components
- Complete Shadcn/ui component library implementation
- Custom styled components following design system
- Responsive layouts with TailwindCSS

## Data Flow

### Client-Server Communication
1. **React Query** handles all API requests with caching
2. **RESTful endpoints** provide data for projects and content
3. **Type-safe** communication using shared TypeScript schemas

### State Management
1. **React Context** for theme and global state
2. **React Query** for server state management
3. **Local state** for component-specific interactions

### Content Management
1. **Projects**: Stored with metadata including title, date, description, URL, and role
2. **Content**: Section-based content system for dynamic page content
3. **Featured Projects**: Curated selection for homepage display

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Database connection (Neon PostgreSQL)
- **@tanstack/react-query**: Data fetching and caching
- **drizzle-orm**: Database ORM and migrations
- **Three.js**: 3D graphics library (loaded via CDN)
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Design System
- **Inter font**: Primary typeface from Google Fonts
- **Neutral color palette**: Consistent with modern design trends
- **CSS custom properties**: Dynamic theming support

## Deployment Strategy

### Build Process
1. **Client Build**: Vite bundles React application to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Served from build output directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string for production
- **NODE_ENV**: Environment detection for development/production modes
- **Replit Integration**: Development banner and error overlay support

### Production Deployment
- **Static serving**: Express serves built client files
- **API routes**: Express handles backend API endpoints
- **Database migrations**: Drizzle handles schema changes

### Development Workflow
- **Hot Module Replacement**: Vite provides instant updates during development
- **Type checking**: TypeScript compilation for error detection
- **Database push**: `npm run db:push` for schema synchronization

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```