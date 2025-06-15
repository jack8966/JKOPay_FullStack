# JKOPay Fullstack Homework Server

This is the server-side application for the JKOPay Fullstack Homework project. It is built with Node.js, Express, TypeScript, and PostgreSQL.

## Project Structure

The project follows a Domain-Driven Design with the following structure:

```
src/
├── application/     # Application business rules
│   ├── services/    # Application services
│   └── usecases/    # Use cases
├── domain/         # Enterprise business rules
│   ├── constants/   # Constants
│   ├── errors/     # Error classes
│   ├── models/     # Domain models
│   └── types/      # Type definitions
├── infrastructure/ # Frameworks and drivers
│   ├── config/     # Configuration
│   ├── database/   # Database setup
│   └── utils/      # Utility functions
└── presentation/   # Interface adapters
    ├── controllers/# Controllers
    ├── middlewares/# Middlewares
    └── routes/     # Routes
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm
- Docker and Docker Compose (for containerized development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jkopay-fullstack-homework-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.development` to `.env` for local development
   - Copy `.env.production` to `.env` for production deployment

Required environment variables:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=jko_db
```

## Development

### Using Docker

1. Start the development environment:
```bash
docker-compose up -d
```

2. Run database migrations:
```bash
npm run migration:run:dev
```

3. Seed the database (if needed):
```bash
npm run seed:dev
```

The server will start on http://localhost:3000 (or the port specified in your .env file).

## Database Management

### Migrations

Development environment:
```bash
# Show pending migrations
npm run migration:show:dev

# Run migrations
npm run migration:run:dev

# Revert last migration
npm run migration:revert:dev
```

Production environment:
```bash
# Show pending migrations
npm run migration:show:prod

# Run migrations
npm run migration:run:prod

# Revert last migration
npm run migration:revert:prod
```

### Database Seeding

Development environment:
```bash
npm run seed:dev
```

Production environment:
```bash
npm run seed:prod
```

## Building

To build the project:

```bash
npm run build
```

The compiled files will be in the `dist` directory.

## Testing

To run tests:

```bash
npm test
```

## Code Quality

### Linting

To run the linter:

```bash
npm run lint
```

### Formatting

To format the code:

```bash
npm run format
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## Security Features

The application includes several security features:
- Helmet for HTTP security headers
- CORS protection
- Rate limiting
- HTTP Parameter Pollution protection
- Input validation using express-validator

## Logging

The application uses Winston for logging, providing structured logging with different log levels.

## License

This project is licensed under the ISC License.
