import db from '../db/connection.js'
import {DataTypes } from 'sequelize'

const Sale = db.define('Sale', {
    id_client: {
        type: DataTypes.ABSTRACT
    },
    id_product: {
        type: DataTypes.ABSTRACT
    },
    date: {
        type: DataTypes.DATE
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    unit_price:{
        type: DataTypes.DOUBLE
    },
    subtotal:{
        type: DataTypes.DOUBLE
    },
    payment_method: {
        type: DataTypes.STRING
    }
});

export default Sale;