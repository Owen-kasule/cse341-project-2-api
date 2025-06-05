import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import itemRoutes from './src/routes/itemRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

await connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());  // Middleware for JSON parsing

// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Items API',
    version: '1.0.0',
    description: 'API for managing items in inventory',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-render-app.onrender.com' 
        : `http://localhost:${process.env.PORT || 8080}`,
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/itemRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Routes
app.get('/', (req, res) => res.send('Hello World - CSE 341 Project 2 API'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/items', itemRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));