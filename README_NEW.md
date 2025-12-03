# Miserere Mei - The Precarious Trails to the Library of Preachers

[![CI/CD Pipeline](https://github.com/APorkolab/Miserere-Mei/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/APorkolab/Miserere-Mei/actions/workflows/ci-cd.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=miserere-mei&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=miserere-mei)
[![Coverage](https://codecov.io/gh/APorkolab/Miserere-Mei/branch/main/graph/badge.svg)](https://codecov.io/gh/APorkolab/Miserere-Mei)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=miserere-mei&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=miserere-mei)
[![License](https://img.shields.io/badge/license-CC--BY--NC--ND--4.0-informational.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-supported-blue.svg)](https://hub.docker.com)

> 🎮 A modern text-based adventure game built with enterprise-grade
> architecture, featuring Angular frontend and Node.js backend with
> comprehensive CI/CD pipeline.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **Docker** 20.10+ with Docker Compose
- **Git** (latest version)

### 1-Minute Setup

```bash
# Clone and start the application
git clone https://github.com/APorkolab/Miserere-Mei.git
cd Miserere-Mei

# Start development environment with Docker
npm run docker:dev

# Access the application
# 🌐 Frontend: http://localhost:4200
# 🔧 Backend API: http://localhost:3000
# 📧 MailHog (dev email): http://localhost:8025
```

### Manual Installation

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm start
```

## 📖 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Game Features

- 🎭 **Interactive Text Adventure**: Post-apocalyptic storyline with branching
  narratives
- ⚔️ **Combat System**: Strategic turn-based battle mechanics
- 🎒 **Inventory Management**: Collect and use items throughout your journey
- 🗺️ **Dynamic Locations**: AI-generated location images and rich descriptions
- 🏆 **Multiple Endings**: Player choices affect the story outcome
- 💾 **Save System**: Persistent game state across sessions

### Technical Features

- 🔐 **Multi-role Authentication**: User, Editor, and Admin roles with JWT
- 🌐 **Internationalization**: Multi-language support (i18n)
- 📱 **Responsive Design**: Mobile-first responsive web application
- 🔍 **Location Editor**: In-game content management system
- 👥 **User Management**: Comprehensive user profile and management
- 🎨 **Modern UI/UX**: Bootstrap 5 with custom styling

### Enterprise Features

- 🚀 **CI/CD Pipeline**: Automated testing, building, and deployment
- 🐳 **Containerization**: Docker support for development and production
- 📊 **Monitoring**: Health checks, metrics, and logging
- 🔒 **Security**: OWASP compliance, security headers, input validation
- 🧪 **Testing**: Unit, integration, and e2e tests with coverage reporting
- 📝 **Documentation**: Comprehensive API and architecture documentation

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Architecture                   │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │  Load Balancer  │    │      CDN        │                │
│  │   (Nginx/ALB)   │    │   (CloudFlare)  │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│  ┌─────────────────────────────────────────────┐          │
│  │              Web Tier                        │          │
│  │  ┌─────────────────┐  ┌─────────────────┐  │          │
│  │  │   Angular SPA   │  │   Nginx Proxy   │  │          │
│  │  │  (TypeScript)   │  │  (Static Files) │  │          │
│  │  └─────────────────┘  └─────────────────┘  │          │
│  └─────────────────────────────────────────────┘          │
│           │                       │                        │
│  ┌─────────────────────────────────────────────┐          │
│  │           Application Tier                   │          │
│  │  ┌─────────────────┐  ┌─────────────────┐  │          │
│  │  │  Express.js API │  │   Game Engine   │  │          │
│  │  │   (Node.js)     │  │  Business Logic │  │          │
│  │  └─────────────────┘  └─────────────────┘  │          │
│  └─────────────────────────────────────────────┘          │
│           │                       │                        │
│  ┌─────────────────────────────────────────────┐          │
│  │              Data Tier                       │          │
│  │  ┌─────────────────┐  ┌─────────────────┐  │          │
│  │  │   MySQL 8.0     │  │   Redis Cache   │  │          │
│  │  │  (Persistent)   │  │   (Sessions)    │  │          │
│  │  └─────────────────┘  └─────────────────┘  │          │
│  └─────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns

- **Layered Architecture**: Separation of concerns across presentation,
  business, and data layers
- **MVC Pattern**: Model-View-Controller architecture
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Loose coupling and testability
- **Observer Pattern**: Event-driven game mechanics

## 🛠️ Technology Stack

### Frontend

- **Framework**: Angular 20+ with TypeScript
- **Styling**: Bootstrap 5 + Custom SCSS
- **State Management**: RxJS with reactive programming
- **HTTP Client**: Angular HttpClient with interceptors
- **UI Components**: NGX-Bootstrap, NGX-Toastr, Angular Feather
- **Internationalization**: NGX-Translate
- **Testing**: Jasmine + Karma

### Backend

- **Runtime**: Node.js 20+
- **Framework**: Express.js with middleware architecture
- **Language**: JavaScript (ES2022)
- **Database**: MySQL 8.0 with Sequelize ORM
- **Authentication**: JWT with bcrypt password hashing
- **Caching**: Redis for sessions and application cache
- **Security**: Helmet.js, CORS, rate limiting
- **Logging**: Winston with structured logging
- **Testing**: Jest with supertest

### DevOps & Infrastructure

- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions with multi-stage pipeline
- **Code Quality**: ESLint, Prettier, SonarQube
- **Security**: OWASP dependency check, security linting
- **Monitoring**: Health checks, metrics collection
- **Documentation**: Swagger/OpenAPI, JSDoc

## 🚀 Development

### Environment Setup

#### Development with Docker (Recommended)

```bash
# Start development environment
npm run docker:dev

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop environment
npm run docker:dev:down

# Rebuild containers
docker-compose -f docker-compose.dev.yml build --no-cache
```

#### Manual Development Setup

```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Available Scripts

#### Root Level Scripts

```bash
npm start              # Start both frontend and backend
npm run build          # Build both applications
npm test              # Run all tests
npm run lint          # Lint all code
npm run format        # Format all code
npm run security:audit # Security audit
```

#### Backend Scripts

```bash
cd backend
npm run dev           # Development server with hot reload
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run coverage     # Generate coverage report
npm run lint         # ESLint checking
npm run format       # Prettier formatting
npm run db:migrate   # Database migrations
npm run db:seed      # Seed test data
```

#### Frontend Scripts

```bash
cd frontend
npm start            # Development server
npm run build:prod   # Production build
npm test            # Run unit tests
npm run test:ci     # CI test run
npm run coverage    # Generate coverage report
npm run lint        # Angular linting
npm run e2e         # End-to-end tests
npm run analyze     # Bundle analyzer
```

### Development Tools

#### Database Management

```bash
# Access MySQL container
docker exec -it miserere-mysql-dev mysql -u root -p

# Run migrations
docker exec miserere-backend-dev npm run db:migrate

# Seed database
docker exec miserere-backend-dev npm run db:seed
```

#### Debugging

- **Backend**: Node.js inspector available on port 9229
- **Frontend**: Angular DevTools and browser developer tools
- **Database**: MySQL Workbench or phpMyAdmin
- **Redis**: Redis CLI or Redis Desktop Manager

## 🧪 Testing

### Test Strategy

#### Unit Tests

- **Backend**: Jest with 80% coverage threshold
- **Frontend**: Jasmine/Karma with Angular Testing Utilities

#### Integration Tests

- API endpoint testing with supertest
- Database integration testing
- Service integration testing

#### End-to-End Tests

- Critical user journey testing
- Cross-browser compatibility testing
- Mobile responsiveness testing

### Running Tests

```bash
# All tests
npm test

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend

# CI tests (no watch mode)
npm run test:ci

# Coverage reports
npm run coverage

# E2E tests
npm run e2e
```

### Quality Gates

- **Code Coverage**: Minimum 80% for both frontend and backend
- **Linting**: ESLint with security and best practice rules
- **Security**: OWASP dependency scanning
- **Performance**: Bundle size analysis and monitoring

## 🚀 Deployment

### Production Deployment

#### Docker Production

```bash
# Build production images
docker build -t miserere-backend:prod -f backend/Dockerfile backend/
docker build -t miserere-frontend:prod -f frontend/Dockerfile frontend/

# Deploy with docker-compose
npm run docker:prod

# Check health
docker-compose ps
docker-compose logs
```

#### Manual Deployment

```bash
# Build applications
npm run build

# Set environment variables
export NODE_ENV=production
export DB_PASSWORD=$(openssl rand -base64 32)
export JWT_SECRET=$(openssl rand -base64 64)

# Start services
npm run start:prod
```

### Environment Configuration

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Optimized production deployment

### Monitoring

- **Health Checks**: `/health` endpoint with service status
- **Metrics**: Application and infrastructure metrics
- **Logging**: Structured logging with Winston
- **Alerts**: Configurable alerting for critical issues

## 📚 Documentation

### Available Documentation

- 📖 **[Architecture Guide](docs/ARCHITECTURE.md)**: Detailed system
  architecture
- 🚀 **[Deployment Guide](docs/DEPLOYMENT.md)**: Comprehensive deployment
  instructions
- 🔧 **[API Documentation](docs/api/)**: OpenAPI/Swagger specifications
- 🧪 **[Testing Guide](docs/testing/)**: Testing strategies and guidelines
- 🔒 **[Security Guide](docs/security/)**: Security best practices

### Code Documentation

- **JSDoc**: Backend API documentation
- **TypeDoc**: Frontend service documentation
- **README files**: Component-specific documentation

## 📋 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register     - User registration
POST   /api/auth/login        - User authentication
GET    /api/auth/profile      - Get user profile
PUT    /api/auth/profile      - Update profile
POST   /api/auth/logout       - User logout
```

### Game Management

```
GET    /api/game/locations    - Get game locations
GET    /api/game/state/:id    - Get game state
POST   /api/game/save         - Save game progress
POST   /api/game/action       - Perform game action
GET    /api/game/inventory    - Get player inventory
```

### Admin & Editor Functions

```
POST   /api/admin/locations   - Create location (admin/editor)
PUT    /api/admin/locations/:id - Update location (admin/editor)
DELETE /api/admin/locations/:id - Delete location (admin only)
GET    /api/admin/users       - User management (admin only)
```

### Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes following the coding standards
5. **Test** your changes thoroughly
6. **Commit** with descriptive messages (`git commit -m 'Add amazing feature'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Create** a Pull Request

### Coding Standards

- **ESLint**: Enforced linting rules for both frontend and backend
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages
- **Test Coverage**: Maintain 80% minimum coverage
- **Documentation**: Document all public APIs and complex logic

### Code Review Process

1. All changes require PR review
2. Automated CI/CD checks must pass
3. At least one approving review required
4. Security and performance considerations reviewed

## 🎮 Game Storyline

### Setting

The year is 2050, in a post-apocalyptic world known as the Land of Desolation.
You control **Cantus Planus**, a skilled mercenary who receives a crucial
mission from the old priest **Gregorio**.

### Mission

Escort five young individuals - **Altus**, **Tenor**, **Bassus**, and the
**Superia sisters** - through the dangerous wasteland to reach the **Library of
Preachers**. There, the ancient librarians will preserve the musical knowledge
these individuals carry for future generations.

### Challenge

Navigate through treacherous terrain while avoiding **Falsetto**, the ruthless
warlord who seeks to prevent your mission. Your choices determine not only the
survival of your companions but the preservation of humanity's musical heritage.

### Gameplay Features

- **Strategic Decision Making**: Every choice affects the story outcome
- **Risk vs. Reward**: Take safer routes or risk greater dangers for better
  rewards
- **Combat System**: Engage in turn-based battles with various enemies
- **Character Development**: Level up your skills and manage resources
- **Multiple Paths**: Discover different routes through the wasteland

## 📄 License

This project is licensed under the **Creative Commons
Attribution-NonCommercial-NoDerivatives 4.0 International License**.

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

### You are free to:

- **Share**: Copy and redistribute the material in any medium or format

### Under the following terms:

- **Attribution**: You must give appropriate credit, provide a link to the
  license, and indicate if changes were made
- **NonCommercial**: You may not use the material for commercial purposes
- **NoDerivatives**: If you remix, transform, or build upon the material, you
  may not distribute the modified material

## 👨‍💻 Author

**Dr. Ádám Porkoláb**

- 🌐 Website: [aporkolab.com](https://aporkolab.com)
- 📧 Email: [adam@porkolab.digital](mailto:adam@porkolab.digital)
- 🐙 GitHub: [@APorkolab](https://github.com/APorkolab)
- 💼 LinkedIn: [ádám-dr-porkoláb](https://linkedin.com/in/ádám-dr-porkoláb)

### Studio

**Hootie in Bootee Studio** - _Independent game development and software
engineering_

## 🙏 Acknowledgments

- **Creative Tim** - Initial HTML template inspiration
- **Midjourney AI** - Game location artwork generation
- **Baris Senkal** - Story HTML template contribution
- **Blissful Lemon** - 403 error page template
- **Open Source Community** - For the amazing tools and libraries

---

<div align="center">

**🎮 Ready to embark on the journey? Start your adventure now!**

[**📖 Documentation**](docs/) |
[**🐛 Report Bug**](https://github.com/APorkolab/Miserere-Mei/issues)

_"In the wasteland of tomorrow, music becomes the light that guides us home."_

</div>
