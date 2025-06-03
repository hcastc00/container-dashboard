import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger.json';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas generadas por tsoa
RegisterRoutes(app);

// UI de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware global de errores
app.use(errorHandler);

export default app;
