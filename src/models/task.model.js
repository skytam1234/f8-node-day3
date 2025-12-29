require("module-alias/register");
const pool = require("../config/database");

const tasksModel = {
    async getAll() {
        const [results] = await pool.query("select * from tasks");
        return results;
    },
    async getOne(id) {
        const [results] = await pool.query(
            `select * from tasks where id=${id}`
        );
        return results;
    },
    async create(data) {
        const { title, isCompleted } = data;
        let completed = 0;
        isCompleted ? (completed = 1) : (completed = 0);
        const query = `insert into tasks (title,isCompleted) values('${title}' , ${completed})`;
        const [results] = await pool.query(query);

        if (results.insertId) {
            const task = await this.getOne(results.insertId);
            return task;
        }
        return results;
    },
    async update(id, data) {
        const { title, isCompleted } = data;
        const para = {};
        let completed = 0;
        if (title !== "undefined") para.title = title;
        if (isCompleted !== "undefined") para.isCompleted = isCompleted;

        isCompleted ? (completed = 1) : (completed = 0);
        const query = `update tasks set title=${title} , isCompleted= ${completed} where id= ${id}`;
        const [results] = await pool.query(query);
        return results;
    },

    async del(id) {
        const query = `delete from tasks  where id= ${id}`;
        const [results] = await pool.query(query);

        // if (results.insertId) {
        //     const task = await this.getOne(results.insertId);
        //     return task;
        // }
        return results;
    },
};
module.exports = tasksModel;
