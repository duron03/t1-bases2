import { config } from 'dotenv';
config();

/**
 * Centraliza la configuración leída desde el archivo .env. Este módulo no
 * contiene credenciales: cada valor debe estar definido en el entorno.
 */
export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_SERVER = process.env.DB_SERVER;
export const DB_DATABASE = process.env.DB_DATABASE;
