# CSE341 Project 2 API

## Overview
This project is a RESTful API for managing items using Node.js, Express, and MongoDB. It implements CRUD (Create, Read, Update, Delete) operations with validation and error handling.

## Project Structure
```
cse341-project-2-api
├── src
│   ├── config
│   │   └── db.js          # MongoDB connection configuration
│   ├── models
│   │   └── Item.js        # Mongoose model for items
│   ├── routes
│   │   └── itemRoutes.js   # CRUD routes for items
│   └── middleware
│       └── validation.js   # Validation logic for requests
├── index.js                # Entry point of the application
├── package.json             # Project metadata and dependencies
├── .env                     # Environment variables
├── .gitignore               # Files and directories to ignore in Git
└── README.md                # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account for database hosting

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/YourUsername/cse341-project-2-api.git
   cd cse341-project-2-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<YourUser>:<YourPass>@cluster0.xxxx.mongodb.net/project2?retryWrites=true&w=majority
   PORT=8080
   ```

### Running the Application
- For development mode (with auto-reload):
  ```
  npm run dev
  ```

- For production mode:
  ```
  npm start
  ```

### API Endpoints
- **GET /items**: Retrieve all items
- **GET /items/:id**: Retrieve a single item by ID
- **POST /items**: Create a new item
- **PUT /items/:id**: Update an existing item by ID
- **DELETE /items/:id**: Delete an item by ID

### Validation
The API uses `express-validator` to ensure that required fields are present and that the price is a numeric value.

### Documentation
API documentation is available at `/api-docs` using Swagger UI.

## Deployment
This application can be deployed on platforms like Render. Ensure to set the environment variables in the deployment settings.

## License
This project is licensed under the MIT License.