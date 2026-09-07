import sql from 'mssql';
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } from '../config.js';

export const dbSettings = {
    user: DB_USER,
    passworrd: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
};