import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js';
import authRoutes from './src/routes/auth.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import passport from 'passport';
import { ensureAuth } from './src/middleware/auth.js';

await connectDB();  // Connect to MongoDB

const app = express();  // This is CORRECT in the main file
app.use(express.json());  // Middleware for JSON parsing

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
        ? 'https://cse341-project-2-api.onrender.com'
        : `http://localhost:${process.env.PORT || 8080}`,
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      OAuth2: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
            tokenUrl: 'https://accounts.google.com/o/oauth2/token',
            refreshUrl: 'https://accounts.google.com/o/oauth2/token',
            scopes: {
              'openid': 'OpenID Connect',
              'profile': 'Access profile information',
              'email': 'Access email address'
            }
          }
        }
      }
    }
  },
  security: [
    {
      OAuth2: ['openid', 'profile', 'email']
    }
  ]
};

const options = {
  definition: swaggerDefinition,  // Fixed property name
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Routes
app.get('/', (req, res) => res.send('Hello World - CSE 341 Project 2 API'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);

// Protect everything else
app.use(ensureAuth);

app.use('/items', itemRoutes);
app.use('/users', userRoutes);
console.log('User routes registered!');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));