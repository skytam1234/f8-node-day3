require("module-alias/register");
const tasksModel = require("@/models/task.model");
const getAll = async (req, res) => {
    const tasks = await tasksModel.findAll();
    res.success(tasks);
};
const getOne = async (req, res) => {
    const id = +req.params.id;
    const task = await tasksModel.findOne(id);
    if (!task) {
        return res.error(404, "404 Not Found");
    }
    res.success(task);
};
const create = async (req, res) => {
    let isCompleted = "false";
    if (req.body.isCompleted !== undefined) {
        isCompleted = req.body.isCompleted ? "true" : "false";
    }
    const data = {
        title: req.body.title,
        isCompleted: isCompleted,
    };
    const task = await tasksModel.create(data);
    if (!task) {
        return res.error(422, "Unprocessable Entity");
    }
    res.success(task, 201);
};

const edit = async (req, res) => {
    const id = +req.params.id;
    let data = {};
    const title = req.body.title;
    let isCompleted = "false";
    if (req.body.isCompleted !== undefined) {
        isCompleted = req.body.isCompleted ? "true" : "false";
    }
    if (title !== void 0) data.title = title;
    if (isCompleted !== void 0) data.isCompleted = isCompleted;
    const numEdited = await tasksModel.update(id, data);
    if (!numEdited) {
        return res.error(404, "404 Not Found");
    }
    res.success(numEdited);
};
const del = async (req, res) => {
    const id = +req.params.id;
    const numDestroy = await tasksModel.destroy(id);
    if (!numDestroy) {
        return res.error(404, "404 Not Found");
    }
    res.success(numDestroy, 204);
};
module.exports = { getAll, getOne, create, edit, del };
