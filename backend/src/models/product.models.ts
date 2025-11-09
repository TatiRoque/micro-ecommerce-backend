import db from '../db/connection.js'
import {DataTypes} from 'sequelize'

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.DOUBLE
    },
    category: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    }
});

export default Product;