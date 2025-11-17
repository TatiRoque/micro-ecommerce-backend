import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Sale = db.define('ventas', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE
  },
  id_cliente: {
    type: DataTypes.INTEGER
  },
  metodo_pago: {
    type: DataTypes.ENUM('Efectivo', 'Tarjeta', 'Transferencia', 'Otro')
  },
  total_venta: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  tableName: 'ventas',
  timestamps: false 
});

export default Sale;
