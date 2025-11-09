import{Request, Response} from 'express'

//Obtener todas las ventas
export const getSales = (req: Request, res: Response) => {

    res.json({
        msg: 'get Sales'
    })

}

//Obtener venta por ID
export const getSale = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Sale',
        id
    })
}

//Borrar venta por ID
export const deleteSale = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'delete Sale',
        id
    })
}

export const postSale = (req: Request, res: Response)=>{
    const {body} = req;
    console.log(body)
    res.json({
        msg: 'post Sale',
        body
    })
}

export const putSale = (req: Request, res: Response)=>{
    const {body} = req;
    const {id} = req.params;
    console.log(body)
    res.json({
        msg: 'put Sale',
        id,
        body
    })
}