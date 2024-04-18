# group-two-backend

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [PostgreSQL](https://www.postgresql.org/download/) - Relational database server

## Usage

Install all the neccessary dependencies by running;

```js
yarn install
```

## Connecting to Postgresql

Once your postgresql database is created and running, create a `.env` file in the root directory of this project. Then add your `DATABASE_URL` and point it to your database connection url.

The migration script;

```js
yarn migrate
```

Start the development server by running;

```js
yarn dev
```

The application runs on `http://localhost:8080`

Ping the `/health-check` endpoint to confirm the server is running correctly on your local machine `http://localhost:8080/api/v1/health-check`
