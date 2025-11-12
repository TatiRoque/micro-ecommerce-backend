import { Request, Response } from 'express';
import Sale from '../models/sale.models.js';

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener ventas'
    });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({
        msg: `No se encontró una venta con el id ${id}`,
      });
    }

    res.json(sale);
  } catch (error) {
    console.error('Error al obtener venta por ID:', error);
    res.status(500).json({
      msg: 'Error al obtener la venta',
    });
  }
};
