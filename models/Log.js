import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js'; // Ajusta la ruta a tu conexión DB

class Log extends Model {}

Log.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    log: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Log',
    tableName: 'logs',
    timestamps: true // Opcional, pero recomendado para logs
});

export default Log;