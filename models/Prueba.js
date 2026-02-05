import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js'; 

class Prueba extends Model {}

Prueba.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: 'Prueba',
    tableName: 'pruebas' // Importante para la DB
});

export default Prueba;