import app from './app';
import { config } from './config';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/docs`);
});
