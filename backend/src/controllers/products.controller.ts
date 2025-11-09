import{Request, Response} from 'express'

//Obtener todos los productos
export const getProducts = (req: Request, res: Response) => {

    res.json({
        msg: 'get Products'
    })

}

//Obtener producto por ID
export const getProduct = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Product',
        id
    })
}