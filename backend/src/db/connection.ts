import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config(); // Cargar las variables


function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno: ${name}`);
  }
  return value;
}


const DB_NAME = getEnvVar('DB_NAME');
const DB_USER = getEnvVar('DB_USER');
const DB_PASSWORD = getEnvVar('DB_PASSWORD');
const DB_HOST = getEnvVar('DB_HOST');
const DB_PORT = getEnvVar('DB_PORT');


const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    
    port: parseInt(DB_PORT, 10),
    
    dialect: getEnvVar('DB_DIALECT') as 'mysql', 
  }
);

export default sequelize;