# Surveillance & Security Monitoring Dashboard

A comprehensive event management dashboard system with real-time monitoring capabilities for security systems including camera feeds, detection analytics, vehicle tracking, and event management.

## Features

- **Safety Dashboard**: PPE compliance monitoring, fire/smoke detection, safety violations tracking
- **Vehicle Dashboard**: Vehicle detection, license plate recognition, violation monitoring
- **Personnel Dashboard**: Face recognition, attendance tracking, access control
- **Event Center**: Unified event aggregation from all modules
- **Zone Monitoring**: Smart space analytics and zone-based monitoring
- **Real-time Analytics**: Live detection feeds and trend analysis

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM
- **Build Tool**: Vite
- **State Management**: TanStack Query

## Prerequisites

### For Local Development
- Node.js 20.x or higher
- PostgreSQL 14+ (or access to a PostgreSQL database)
- npm or yarn package manager

### For Docker Development
- Docker Engine 20.x or higher
- Docker Compose 2.x or higher

## Running Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Node Environment
NODE_ENV=development

# Session Secret (generate a random string)
SESSION_SECRET=your-secret-key-here
```

### 4. Database Setup

Run database migrations:

```bash
npm run db:push
```

To force push (if there are schema conflicts):

```bash
npm run db:push -- --force
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
- Frontend & Backend: http://localhost:5000

## Running with Docker

The project includes `docker-compose.yml` and `Dockerfile` for easy Docker deployment.

### 1. Docker Files Overview

The following files are included in the project:

- **docker-compose.yml**: Orchestrates PostgreSQL and the application containers
- **Dockerfile**: Multi-stage build for optimized production image
- **.dockerignore**: Excludes unnecessary files from Docker build

### 2. Environment Configuration

Before running, update the `SESSION_SECRET` in `docker-compose.yml`:

```yaml
environment:
  SESSION_SECRET: your-secure-random-key-here
```

### 3. Build and Run

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

The application will be available at:
- http://localhost:5000

## Build Scripts

```bash
# Development
npm run dev              # Start development server

# Database
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Drizzle Studio (database GUI)

# Production Build
npm run build            # Build for production
npm start                # Start production server
```

## Project Structure

```
.
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and helpers
│   │   └── App.tsx      # Main app component
│   └── dist/            # Built frontend assets
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data storage interface
│   └── vite.ts          # Vite middleware
├── shared/              # Shared types and schemas
│   └── schema.ts        # Database schema
├── attached_assets/     # Static assets (images, etc.)
├── package.json
└── README.md
```

## Database Schema

The application uses Drizzle ORM with PostgreSQL. Schema is defined in `shared/schema.ts`.

To modify the database:
1. Update schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update storage interface in `server/storage.ts` if needed

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection string | Yes | - |
| NODE_ENV | Environment (development/production) | No | development |
| SESSION_SECRET | Secret for session encryption | Yes | - |
| PORT | Server port | No | 5000 |

## Development Guidelines

### Adding New Pages
1. Create page component in `client/src/pages/`
2. Register route in `client/src/App.tsx`
3. Add navigation in sidebar (if needed)

### Database Changes
1. Update `shared/schema.ts` with new models
2. Update storage interface in `server/storage.ts`
3. Add API routes in `server/routes.ts`
4. Run `npm run db:push` to apply changes

### Styling
- Use Tailwind CSS utility classes
- Follow existing Shadcn/UI component patterns
- Maintain dark mode support with `dark:` variants

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql $DATABASE_URL
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

## Docker Configuration Reference

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: surveillance_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/surveillance_db
      NODE_ENV: production
      SESSION_SECRET: your-secret-key-here
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./attached_assets:/app/attached_assets

volumes:
  postgres_data:
```

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/attached_assets ./attached_assets

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
```

## License

This project is proprietary software. All rights reserved.

## Support

For issues or questions, please contact the development team.
