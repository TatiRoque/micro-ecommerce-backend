import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const DetalleVenta = db.define('DetalleVenta', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
  
}, {
  tableName: 'detalle_ventas',
  timestamps: false,
});

export default DetalleVenta;
