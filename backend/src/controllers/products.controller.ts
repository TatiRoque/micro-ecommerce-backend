import{Request, Response} from 'express'
import Producto from '../models/product.models.js'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Producto.findAll();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener ventas'
    });
  }

}

export const getProduct = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Product',
        id
    })
}