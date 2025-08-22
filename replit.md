# Overview

This is a React-based surveillance and security monitoring dashboard application built with a full-stack architecture. The application provides real-time monitoring capabilities for security systems including camera feeds, detection analytics, vehicle tracking, and event management. It features a modern interface with dashboard views, metric tracking, and administrative controls for security operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix
- **Development**: Hot reload with tsx for TypeScript execution
- **Production**: ESBuild for server bundling

## Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definition in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations

## Authentication & Data Storage
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **User Management**: Basic user schema with username/password authentication

## Component Architecture
- **Layout**: Two-column layout with navigation sidebar and main content area
- **Sections**: Modular section components (EventSummarySection, ControlPanelSection)
- **UI System**: Comprehensive component library with consistent theming
- **Form Handling**: React Hook Form with Zod validation schemas

## Development Environment
- **Monorepo Structure**: Client and server code in same repository
- **Shared Types**: Common TypeScript definitions in `/shared` directory
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/)
- **Code Quality**: TypeScript strict mode enabled

## External Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **@radix-ui/***: Primitive UI components for accessible design system
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM for PostgreSQL operations
- **drizzle-kit**: Database migration and schema management tools
- **express**: Web framework for Node.js backend
- **react-hook-form**: Form state management and validation
- **zod**: Runtime type validation and schema definition
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for React components
- **wouter**: Lightweight React router
- **class-variance-authority**: Utility for component variant management