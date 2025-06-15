# JKOPay Fullstack Homework Server

This is the server-side application for the JKOPay Fullstack Homework project. It is built with Node.js, Express, TypeScript, and PostgreSQL.

## Project Structure

The project follows a clean architecture pattern with the following structure:

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
└── presentation/     # Interface adapters
    ├── controllers/# Controllers
    ├── middlewares/# Middlewares
    └── routes/     # Routes
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jkopay-fullstack-homework-server
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=jko_db
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The server will start on http://localhost:3000 (or the port specified in your .env file).

## Building

To build the project:

```bash
npm run build
# or
yarn build
```

The compiled files will be in the `dist` directory.

## Testing

To run tests:

```bash
npm test
# or
yarn test
```

## Linting

To run the linter:

```bash
npm run lint
# or
yarn lint
```

## Formatting

To format the code:

```bash
npm run format
# or
yarn format
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## License

This project is licensed under the ISC License.
