# Portfolio Website - Modern React Development

## Overview

This is a modern, full-stack portfolio website built with React and Express, featuring a sleek design system powered by shadcn/ui components. The application showcases professional work through an interactive, responsive interface with smooth animations and a comprehensive contact system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Design System
- **Component Library**: Custom implementation of shadcn/ui components
- **Theme System**: CSS custom properties with light/dark mode support
- **Typography**: Inter font family for consistent, modern appearance
- **Icons**: Font Awesome and Lucide React icons
- **Color Scheme**: Neutral base with cyan-to-violet gradients for accents

## Key Components

### Portfolio Sections
1. **Hero Section**: Animated typewriter effect introducing the developer with smooth scroll navigation
2. **About Section**: Skills showcase with animated progress indicators and technology badges
3. **Projects Section**: Filterable project gallery with category-based filtering
4. **Contact Section**: Form submission with validation and success/error feedback
5. **Navigation**: Sticky header with smooth scroll-to-section functionality

### Contact System
- Form validation using Drizzle schema validation
- Real-time submission feedback with toast notifications
- Admin endpoint for viewing all submissions
- PostgreSQL database integration with Drizzle ORM

### UI Components
- Comprehensive shadcn/ui component suite
- Responsive design with mobile-first approach
- Consistent spacing and typography scale
- Accessibility-focused component implementations

## Data Flow

### Contact Form Submission
1. User fills out contact form with name, email, subject, and message
2. Frontend validates input and submits via TanStack Query mutation
3. Backend validates data using Drizzle schema
4. Submission stored in PostgreSQL database via Drizzle ORM
5. Success/error feedback displayed via toast notifications

### Theme Management
1. Theme preference stored in localStorage
2. CSS custom properties updated on theme change
3. System respects user's OS theme preference as default
4. Smooth transitions between light and dark modes

### Project Filtering
1. Project data managed in static data file
2. Client-side filtering by category (frontend, fullstack, mobile)
3. Animated transitions when switching filters
4. Responsive grid layout adapts to different screen sizes

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- TanStack Query for server state management
- Express.js for backend API

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible component foundations
- shadcn/ui for pre-built component implementations
- Lucide React for modern icon set

### Database and Validation
- Drizzle ORM for type-safe database operations
- Drizzle Kit for database migrations
- Zod for runtime type validation
- Neon Database for serverless PostgreSQL

### Development Tools
- Vite for fast development server and optimized builds
- TypeScript for type safety
- ESBuild for production bundling
- Replit-specific development enhancements

## Deployment Strategy

### Build Process
1. Frontend built with Vite, optimized for production
2. Backend bundled with ESBuild for Node.js deployment
3. Static assets served from Express in production
4. TypeScript compilation for type checking

### Environment Configuration
- Development mode uses Vite dev server with HMR
- Production serves static files from Express
- Database URL configured via environment variables
- Replit-specific banner integration for development

### Database Migration
- Drizzle migrations stored in `/migrations` directory
- Schema defined in `/shared/schema.ts` for type sharing
- Push-based migration strategy with `db:push` command

## Changelog
- June 30, 2025. Initial setup with React portfolio and in-memory storage
- June 30, 2025. Added PostgreSQL database integration with Drizzle ORM

## User Preferences

Preferred communication style: Simple, everyday language.