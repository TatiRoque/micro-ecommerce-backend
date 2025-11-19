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
    res.status(500).json({ msg: "Error obteniendo la estadística" });
  }
};

export const getMetodosPagoPorFecha = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        DATE(v.fecha) AS fecha,
        v.metodo_pago,
        SUM(v.total_venta) AS total
      FROM ventas v
      GROUP BY DATE(v.fecha), v.metodo_pago
      ORDER BY fecha ASC;
    `);

    // --- Agrupar por fecha ---
    const tendenciaMap: any = {};

    (rows as any[]).forEach(row => {
      const fecha = row.fecha;

      if (!tendenciaMap[fecha]) {
        tendenciaMap[fecha] = {
          fecha,
          Tarjeta: 0,
          Efectivo: 0,
          Transferencia: 0,
        };
      }

      tendenciaMap[fecha][row.metodo_pago] = Number(row.total);
    });

    const tendencia = Object.values(tendenciaMap);

    // --- Calcular desvío estándar ---
    const metodoKeys = ["Tarjeta", "Efectivo", "Transferencia"];
    const desvio: any = {};

    metodoKeys.forEach(metodo => {
      const valores = tendencia.map((f: any) => f[metodo]);

      const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
      const varianza =
        valores.reduce((acc, val) => acc + Math.pow(val - promedio, 2), 0) /
        valores.length;

      desvio[metodo] = Math.sqrt(varianza);
    });

    res.json({
      tendencia,
      desvio,
    });

  } catch (error) {
    console.error("Error obteniendo métodos de pago por fecha:", error);
    res.status(500).json({ msg: "Error obteniendo estadísticas" });
  }
};



export const getUnidadesVendidasPorCategoria = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.categoria AS categoria,
        SUM(d.cantidad) AS unidades_vendidas,
        COUNT(*) AS total_registros
      FROM detalle_ventas d
      JOIN productos p ON p.id_producto = d.id_producto
      GROUP BY p.categoria
      ORDER BY unidades_vendidas DESC;
    `);

    const data = (rows as any[]).map(r => ({
      categoria: r.categoria,
      unidades_vendidas: Number(r.unidades_vendidas),
      promedio: Number(r.unidades_vendidas) / Number(r.total_registros)
    }));

    res.json(data);

  } catch (error) {
    console.error("Error obteniendo unidades vendidas por categoría:", error);
    res.status(500).json({ msg: "Error obteniendo estadísticas" });
  }
};

export const getCorrelacionPearson = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.precio AS x,
        SUM(d.cantidad) AS y
      FROM detalle_ventas d
      JOIN productos p ON p.id_producto = d.id_producto
      GROUP BY p.id_producto, p.precio;
    `);

    const data = rows as { x: number | string; y: number | string }[];
    const n = data.length;

    if (n < 2) {
      return res.json({ 
        coeficiente: 0, 
        mensaje: "Datos insuficientes para calcular correlación" 
      });
    }

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;

    data.forEach(row => {
      const valX = Number(row.x);
      const valY = Number(row.y);

      sumX += valX;
      sumY += valY;
      sumXY += (valX * valY);
      sumX2 += (valX * valX);
      sumY2 += (valY * valY);
    });

    const numerador = (n * sumXY) - (sumX * sumY);
    
    const termX = (n * sumX2) - (sumX * sumX);
    const termY = (n * sumY2) - (sumY * sumY);
    const denominador = Math.sqrt(termX * termY);

    const r = denominador === 0 ? 0 : (numerador / denominador);

    res.json({
      coeficiente: Number(r.toFixed(4)), 
      interpretacion: interpretarPearson(r)
    });

  } catch (error) {
    console.error("Error calculando Pearson:", error);
    res.status(500).json({ msg: "Error en el cálculo estadístico" });
  }
};

const interpretarPearson = (r: number): string => {
  if (r === 0) return "Nula";
  const abs = Math.abs(r);
  const tipo = r > 0 ? "Positiva" : "Negativa";
  
  if (abs < 0.3) return `Débil ${tipo}`;
  if (abs < 0.7) return `Moderada ${tipo}`;
  return `Fuerte ${tipo}`;
};