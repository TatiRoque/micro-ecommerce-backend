import Server from "./models/server.js";
import './models/associations.js';
import dotenv from 'dotenv'

//Configuracion de las variables de ambiente
dotenv.config();
try {
  const server = new Server();
} catch (error) {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
}