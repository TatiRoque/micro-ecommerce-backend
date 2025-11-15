import Server from "./models/server.js";
import './models/associations.js';


import dotenv from 'dotenv'

//Configuracion de las variables de ambiente
dotenv.config();

const server = new Server();