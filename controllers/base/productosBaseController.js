// controllers/base/productosBaseController.js
import * as Service from "../../services/productosService.js";

export const listar = async (req, res) => {
    try {
        const data = await Service.getAll();
        res.json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const obtener = async (req, res) => {
    try {
        const data = await Service.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const crear = async (req, res) => {
    try {
        const data = await Service.create(req.body);
        res.status(201).json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const actualizar = async (req, res) => {
    try {
        const data = await Service.update(req.params.id, req.body);
        data ? res.json(data) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};

export const eliminar = async (req, res) => {
    try {
        const exito = await Service.remove(req.params.id);
        exito ? res.json({ msg: "Eliminado" }) : res.status(404).json({ msg: "No encontrado" });
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: e.message }); 
    }
};
