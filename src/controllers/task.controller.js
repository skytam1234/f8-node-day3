require("module-alias/register");
const tasksModel = require("@/models/task.model");
const getAll = async (req, res) => {
    const tasks = await tasksModel.getAll();
    res.success(tasks);
};
const getOne = async (req, res) => {
    const id = +req.params.id;
    const task = await tasksModel.getOne(id);
    if (!task) {
        return res.error({ message: "404 Not Found" }, 404);
    }
    res.success(task);
};
const create = async (req, res) => {
    const data = {
        title: req.body.title,
        isCompleted: req.body.isCompleted,
    };
    const task = await tasksModel.create(data);
    if (!task) {
        return res.error({ message: "Unprocessable Entity" }, 422);
    }
    res.success(task, 201);
};

const edit = async (req, res) => {
    const id = +req.params.id;
    let data = {};
    const title = req.body.title;
    const isCompleted = req.body.isCompleted;
    if (title !== void 0) data.title = title;
    if (isCompleted !== void 0) data.isCompleted = isCompleted;
    const task = await tasksModel.update(id, data);
    if (!task) {
        return res.error({ message: "404 Not Found" }, 404);
    }
    res.response(task);
};
const del = async (req, res) => {
    const id = +req.params.id;
    const task = await tasksModel.del(id);
    if (!task) {
        return res.error({ message: "404 Not Found" }, 404);
    }
    res.response(task, 200);
};
module.exports = { getAll, getOne, create, edit, del };
