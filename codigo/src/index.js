import app from './app.js';
import { PORT } from './config.js';

/** Punto de entrada: inicia la API con el puerto configurado en .env. */
app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
