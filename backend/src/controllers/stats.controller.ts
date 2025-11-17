import { Request, Response } from "express";
import db from "../db/connection.js";

export const getDispersionPrecioCantidad = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.precio,
        SUM(d.cantidad) AS cantidad_vendida
      FROM detalle_ventas d
      JOIN productos p ON p.id_producto = d.id_producto
      GROUP BY p.id_producto, p.precio;
    `);

    res.json(results);
  } catch (error) {
    console.error("Error en dispersión precio vs cantidad:", error);
    res.status(500).json({
      msg: "Error obteniendo la estadística"
    });
  }
};

export const getMetodosPagoPorFecha = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(`
      SELECT 
        DATE(v.fecha) AS fecha,
        v.metodo_pago,
        SUM(v.total_venta) AS total
      FROM ventas v
      GROUP BY DATE(v.fecha), v.metodo_pago
      ORDER BY fecha, metodo_pago;
    `);

    res.json(results);

  } catch (error) {
    console.error("Error obteniendo métodos de pago por fecha:", error);
    res.status(500).json({
      msg: "Error obteniendo estadísticas"
    });
  }
};

export const getUnidadesVendidasPorCategoria = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.categoria AS categoria,
        SUM(d.cantidad) AS unidades_vendidas
      FROM detalle_ventas d
      JOIN productos p ON p.id_producto = d.id_producto
      GROUP BY p.categoria
      ORDER BY unidades_vendidas DESC;
    `);

    res.json(results);

  } catch (error) {
    console.error("Error obteniendo unidades vendidas por categoría:", error);
    res.status(500).json({
      msg: "Error obteniendo estadísticas"
    });
  }
};


