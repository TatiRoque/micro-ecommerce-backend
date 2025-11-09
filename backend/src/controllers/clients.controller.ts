import {Request, Response} from 'express'

export const getClients = (req: Request, res: Response) => {

    res.json({
        msg: 'get Clients'
    })

}

//Obtener producto por ID
export const getClient = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Client',
        id
    })
}