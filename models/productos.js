import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Productos extends Model {}

Productos.init({
    // ... tus campos aquí ...
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT
}, {
    sequelize,
    modelName: 'Productos',
    tableName: 'productos',
});

// ⚠️ ESTA ES LA LÍNEA QUE TE FALTA O QUE ESTÁ MAL:
export default Productos;