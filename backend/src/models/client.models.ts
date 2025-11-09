import db from '../db/connection.js'
import {DataTypes} from 'sequelize'

const Client = db.define('Client', {
    name: {
        type: DataTypes.STRING    
    },
    age: {
        type: DataTypes.INTEGER 
    },
    email: {
        type: DataTypes.STRING
    },
    postalCode: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    }
});

export default Client;