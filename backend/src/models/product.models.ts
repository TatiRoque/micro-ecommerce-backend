// src/models/productos.ts
import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Producto = db.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'productos',
  timestamps: false,
});

export default Producto;
