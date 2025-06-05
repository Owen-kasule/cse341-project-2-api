import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import itemRoutes from './src/routes/itemRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

await connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());  // Middleware for JSON parsing

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Items API',
    version: '1.0.0',
    description: 'API for managing items',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/itemRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send('Hello World'));  // Test route
app.use('/items', itemRoutes);  // Mount item routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));