// models/Examen.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
class Examen extends Model {}
Examen.init({ nombre: DataTypes.STRING }, { sequelize, modelName: 'Examen' });
export default Examen;