import sql from 'mssql';
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } from '../config.js';

/**
 * Parámetros de conexión a SQL Server construidos a partir de las variables
 * de entorno. Se reutilizan en cada solicitud de conexión del controlador.
 */
export const dbSettings = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

/**
 * Obtiene el pool de conexión de mssql para ejecutar procedimientos almacenados.
 * Los errores de conexión se registran para facilitar el diagnóstico interno.
 */
export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;

    } catch (error) {
        console.error(error);
    }
};

export { sql };
