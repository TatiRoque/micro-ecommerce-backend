import {Request, Response} from 'express'
import Cliente from '../models/client.models.js'

export const getClients = async (req: Request, res: Response) => {

    try {
    const client = await Cliente.findAll();
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener ventas'
    });
  }

}

//Obtener producto por ID
export const getClient = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Client',
        id
    })
}