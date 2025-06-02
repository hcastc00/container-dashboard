import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes/routes'; // Archivo generado por tsoa
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger.json';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
RegisterRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

export default app; 