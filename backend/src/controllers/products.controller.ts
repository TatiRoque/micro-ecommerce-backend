import{Request, Response} from 'express'
import Producto from '../models/product.models.js'

//Obtener todos los productos
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

//Obtener producto por ID
export const getProduct = (req: Request, res: Response)=>{
    const {id} = req.params;
    res.json({
        msg: 'get Product',
        id
    })
}