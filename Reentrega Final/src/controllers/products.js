import {
    findAll,
    findAllByCategory,
    save,
    updateById,
    deleteById as deleteByIdRepo,
    findOne
} from "../repositories/product.js";

export const getAll = async (req, res) => {
    const data = await findAll();
    res.send(data);
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await findOne(id);
        res.send(data);
    } catch (e) {
        console.error(e)
        res.status(500).send({
            message: e.message
        })
    }

}

export const getAllByCategory = async (req, res) => {
    const category = req.params.category;
    const data = await findAllByCategory(category);
    res.send(data);
}

export const post = async (req, res) => {
    const data = req.body;
    const savedData = await save(data);
    res.status(201).send(savedData)
}

export const putById = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedData = await updateById(id, data);
    res.status(200).send(updatedData)
}

export const deleteById = async (req, res) => {
    const id = req.params.id;
    const deletedData = await deleteByIdRepo(id);
    res.status(204).send(deletedData)
}