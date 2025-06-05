# CSE 341 Project 2 - Inventory Management API

## Overview
This project is an Inventory Management API built using Node.js, Express, and MongoDB. It provides a RESTful API for managing inventory items, allowing users to perform CRUD (Create, Read, Update, Delete) operations.

## Project Structure
```
cse341-project-2-api
├── src
│   ├── models
│   │   └── index.js        # Mongoose models for inventory items
│   ├── routes
│   │   └── index.js        # Express routes for CRUD operations
│   ├── config
│   │   └── database.js      # Database connection configuration
│   └── app.js              # Express application setup
├── index.js                # Entry point of the application
├── package.json            # npm configuration file
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Owen-kasule/cse341-project-2-api.git
   cd cse341-project-2-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Rename `.env.example` to `.env` and update the `MONGO_URI` with your MongoDB connection string.

4. **Run the Application**
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## Usage
Once the server is running, you can access the API at `http://localhost:8080`. Use tools like Postman or curl to interact with the API endpoints for managing inventory items.

## License
This project is licensed under the MIT License.