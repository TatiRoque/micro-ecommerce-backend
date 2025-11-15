import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Cliente = db.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F', 'Otro'),
    allowNull: true,
  },
  codigo_postal: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  edad: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
}, {
  tableName: 'clientes',
  timestamps: false,
});

export default Cliente
