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

const edit = (req, res) => {
    const id = +req.params.id;
    const data = {
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const post = postsModel.edit(id, data);
    if (!post) {
        return res.error({ message: "404 Not Found" }, 404);
    }
    res.success(post);
};
const del = async (req, res) => {
    const id = +req.params.id;
    const post = await tasksModel.del(id);
    if (!post) {
        return res.error({ message: "404 Not Found" }, 404);
    }
    res.success(post, 204);
};
module.exports = { getAll, getOne, create, edit, del };
