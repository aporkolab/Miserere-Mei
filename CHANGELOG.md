# Changelog

## [1.7.0] - 2026-08-05

### Added

- Egyetlen image-es Angular, Express és SQLite production futtatás.
- Verziózott Umzug migráció és idempotens kezdeti adatfeltöltés.
- Playwright E2E, mobil/desktop vizuális regresszió és Axe WCAG kapu.
- Prometheus metrikák, readiness és opcionális Sentry hibakövetés.
- Staging/production immutable deploy, smoke test és rollback workflow.
- Ellenőrzőösszeges backup és integritásvizsgált restore runbook.

### Changed

- A hitelesítés HttpOnly, Secure, SameSite cookie-ra és origin-védelemre
  váltott.
- A CI fail-fast minőségkapukkal és egységes container builddel működik.
- A teljes dokumentáció az 1.7 architektúrához igazodik.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Senior-level CI/CD pipeline with comprehensive testing and security scanning
- Production-ready Docker containers with multi-stage builds
- Comprehensive code quality tools (ESLint, Prettier, Stylelint)
- Pre-commit hooks with automated security scanning
- Semantic release automation with conventional commits
- Complete architecture and deployment documentation
- Security policy and vulnerability reporting process
- Professional GitHub issue and PR templates
- Contributing guidelines for open-source collaboration

### Changed

- Updated project structure for enterprise-grade development
- Enhanced security configurations and best practices
- Improved development workflow with automated quality gates

### Fixed

- Git hooks compatibility issues
- Package.json script configurations
- CI/CD pipeline token dependencies (made optional)

### Security

- Implemented OWASP dependency scanning
- Added pre-commit security validation
- Enhanced container security with non-root users
- Implemented security headers and CORS protection

## [1.0.3] - 2024-01-15

### Added

- Backend ported to SQL database
- Docker containerization support
- Health check endpoints
- Structured logging with Winston

### Changed

- Migrated from MongoDB to MySQL for better data integrity
- Enhanced error handling and validation
- Updated dependencies to latest versions

### Fixed

- Database connection timeout issues
- Authentication token refresh mechanism
- Game state persistence bugs

### Security

- Enhanced JWT token validation
- Implemented rate limiting
- Added input sanitization

## [1.0.0] - 2023-06-01

### Added

- Backend ported to Node.JS + Express.JS platform
- Frontend rewritten on Angular 14 base
- Location editor with full form field validation
- User accounts with comprehensive form validation
- Complete playable game space
- Side missions and storylines
- Full inventory system
- Location texts stored in database
- Object usage mechanics
- Turn-based combat system
- Unified AI-generated location maps

### Changed

- Complete architectural redesign from previous Java version
- Modern web-based interface
- RESTful API architecture
- Responsive design for mobile compatibility

### Fixed

- Combat system stability issues
- Inventory duplication bugs
- Session management problems

## [0.8] - 2022-12-01

### Added

- Spring Boot backend foundation
- Angular 12 frontend (partial)
- Basic combat system
- Single enemy type implementation
- XML-based location text storage

### Known Issues

- Combat system has stability issues
- Limited enemy variety
- Stock photos used for location images

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Migration Guides

### From v1.0.2 to v1.0.3

1. **Database Migration**: Run the provided SQL migration scripts
2. **Environment Variables**: Update configuration files with new variables
3. **Dependencies**: Run `npm install` to update to latest packages
4. **Docker**: Rebuild containers with new configurations

### From v0.8 to v1.0.0

This was a complete rewrite. Migration from v0.8 is not supported - fresh
installation required.

## Breaking Changes

### v1.0.3

- Database schema changes require migration
- API endpoint response format updated
- Authentication token format changed

### v1.0.0

- Complete platform change from Java to Node.js
- New database schema (MongoDB Atlas)
- New frontend framework (Angular 14)
- New API structure

## Compatibility

### Browser Support

| Browser | Minimum Version | Fully Supported |
| ------- | --------------- | --------------- |
| Chrome  | 80+             | ✅              |
| Firefox | 75+             | ✅              |
| Safari  | 13+             | ✅              |
| Edge    | 80+             | ✅              |

### Node.js Support

| Node.js Version | Support Status |
| --------------- | -------------- |
| 20.x            | ✅ Active      |
| 18.x            | ✅ Maintenance |
| 16.x            | ❌ End of Life |

## Support

For questions about releases or upgrade issues:

- 📧 **Email**: [adam@porkolab.digital](mailto:adam@porkolab.digital)
- 🐛 **Issues**:
  [GitHub Issues](https://github.com/APorkolab/Miserere-Mei/issues)
- 💬 **Discussions**:
  [GitHub Discussions](https://github.com/APorkolab/Miserere-Mei/discussions)
