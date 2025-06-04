import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger.json';
import rateLimit from 'express-rate-limit';


const app = express();

app.use(cors());
app.use(express.json());

// Configuración del rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 solicitudes por IP dentro del windowMs
    standardHeaders: true, // devuelve info sobre el rate limit en los headers `RateLimit-*`
    legacyHeaders: false, // deshabilita los headers `X-RateLimit-*`
    message: 'Too many requests from this IP, please try again later.',
  });
  
  app.use(limiter);

RegisterRoutes(app);

// UI de Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
