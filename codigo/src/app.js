import express from 'express';
import AdventureWorks2025Routes from './routes/AdventureWorks2025.routes.js';

/**
 * Configura la aplicación HTTP: interpreta cuerpos JSON y registra las rutas
 * públicas de AdventureWorks. El inicio del servidor se mantiene en index.js.
 */
const app = express();

app.use(express.json());
app.use(AdventureWorks2025Routes);

export default app;
