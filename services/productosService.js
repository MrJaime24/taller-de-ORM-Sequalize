// services/productosService.js
import productos from "../models/productos.js";

// El modelo ya viene inicializado desde su archivo.
// Simplemente lo asignamos a una constante para usarlo.
const Model = productos;

export const getAll = async () => {
    return await Model.findAll();
};

export const getById = async (id) => {
    return await Model.findByPk(id);
};

export const create = async (data) => {
    return await Model.create(data);
};

export const update = async (id, data) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
