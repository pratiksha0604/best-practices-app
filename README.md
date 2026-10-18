@'
# Best Practices Web App

A task manager REST API built with Node.js, Express and SQLite, following web development best practices.

## Features

- Users and tasks with a one-to-many relationship
- Layered structure: routes, controllers, models
- Input validation and central error handling
- Prepared statements (protection against SQL injection)
- Environment-based configuration
- Automated API tests

## Tech Stack

- Node.js (v22.5 or newer, for built-in SQLite)
- Express
- SQLite (`node:sqlite`)
- dotenv, nodemon, supertest

## Project Structure

```
best-practices-app/
├── src/
│   ├── config/        # database connection and schema
│   ├── controllers/   # request handling and validation
│   ├── models/        # database queries
│   ├── routes/        # route definitions
│   ├── middleware/    # error handling
│   └── app.js         # Express app setup
├── tests/             # automated API tests
├── public/            # static files
├── .env.example       # sample environment variables
└── server.js          # entry point
```

## Setup

1. Clone the repository and install dependencies:

```
   npm install
```

2. Create a `.env` file (see `.env.example`):

```
   PORT=3000
```

3. Start the server:

```
   npm run dev
```

   The app runs at http://localhost:3000.

## API Endpoints

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /health          | Health check       |
| GET    | /api/users       | List users         |
| POST   | /api/users       | Create a user      |
| GET    | /api/tasks       | List tasks         |
| GET    | /api/tasks/:id   | Get one task       |
| POST   | /api/tasks       | Create a task      |
| PUT    | /api/tasks/:id   | Update a task      |
| DELETE | /api/tasks/:id   | Delete a task      |

### Example

```
POST /api/users
{ "name": "Pratiksha", "email": "pratiksha@example.com" }

POST /api/tasks
{ "user_id": 1, "title": "Finish the project" }
```

Task status can be `pending`, `in_progress` or `done`.

## Testing

```
npm test
```

## Deployment

Set the `PORT` environment variable on your hosting platform and run `npm start`.

## Author

[pratiksha0604](https://github.com/pratiksha0604)
'@ | Set-Content README.md