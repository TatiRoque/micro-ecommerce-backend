import Sale from './sale.models.js';
import DetalleVenta from './saleDetail.model.js';

Sale.hasMany(DetalleVenta, {
  foreignKey: 'id_venta',
  as: 'detalles'
});

DetalleVenta.belongsTo(Sale, {
  foreignKey: 'id_venta',
  as: 'venta'
});
