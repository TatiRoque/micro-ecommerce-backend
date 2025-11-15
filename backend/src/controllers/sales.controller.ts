import { Request, Response } from 'express';
import Sale from '../models/sale.models.js';
import DetalleVenta from '../models/saleDetail.model.js';
import db from '../db/connection.js';

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
    const sale = await Sale.findByPk(id, {
      include: [
        {
          model: DetalleVenta,
          as: 'detalles'
        }
      ]
    });

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

export const createSale = async (req: Request, res: Response) => {
  const { fecha, id_cliente, metodo_pago, detalles } = req.body;

  const transaction = await db.transaction();

  try {
    let total_venta = 0;

    detalles.forEach((d: any) => {
      d.subtotal = d.cantidad * d.precio_unitario;
      total_venta += d.subtotal;
    });

    const sale = await Sale.create(
      {
        fecha,
        id_cliente,
        metodo_pago,
        total_venta,
      },
      { transaction }
    );

    const id_venta = sale.getDataValue('id_venta');

    for (const item of detalles) {
      await DetalleVenta.create(
        {
          id_venta,
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario
        },
        { transaction }
      );
    }

    await transaction.commit();

    res.json({
      msg: "Venta creada correctamente",
      sale,
    });

  } catch (error) {
    console.error("Error al crear venta:", error);

    await transaction.rollback();

    res.status(500).json({
      msg: "Error al crear la venta",
    });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha, id_cliente, metodo_pago, detalles } = req.body;

  const transaction = await db.transaction();

  try {
    const sale = await Sale.findByPk(id, { transaction });

    if (!sale) {
      await transaction.rollback();
      return res.status(404).json({
        msg: `No se encontró una venta con el id ${id} para actualizar.`,
      });
    }

    let total_venta = 0;

   
    detalles.forEach((d: any) => {
      
      d.subtotal = d.cantidad * d.precio_unitario;
      total_venta += d.subtotal;
    });

    
    await sale.update(
      {
        fecha,
        id_cliente,
        metodo_pago,
        total_venta, 
      },
      { transaction }
    );

    
    await DetalleVenta.destroy({
      where: { id_venta: id },
      transaction,
    });

    
    for (const item of detalles) {
      await DetalleVenta.create(
        {
          id_venta: id,
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          precio_unitario: item.precio_unitario,
        },
        { transaction }
      );
    }

    await transaction.commit();

    res.json({
      msg: 'Venta actualizada correctamente',
      sale: sale,
    });
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    await transaction.rollback();
    res.status(500).json({
      msg: 'Error al actualizar la venta',
    });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = await db.transaction();

  try {
    const sale = await Sale.findByPk(id, { transaction });

    if (!sale) {
      await transaction.rollback();
      return res.status(404).json({
        msg: `No se encontró una venta con el id ${id} para eliminar.`,
      });
    }

    
    await DetalleVenta.destroy({
      where: { id_venta: id },
      transaction,
    });

    
    await sale.destroy({ transaction });

    await transaction.commit();

    res.json({
      msg: `Venta con id ${id} y sus detalles eliminados correctamente.`,
    });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    await transaction.rollback();
    res.status(500).json({
      msg: 'Error al eliminar la venta',
    });
  }
};



