require("module-alias/register");
const pool = require("../config/database");

const tasksModel = {
    async getAll() {
        const [results] = await pool.query("select * from tasks");
        const data = results?.map((task) => ({
            ...task,
            isCompleted: task.isCompleted === 1,
        }));
        return data;
    },
    async getById(id) {
        const [results] = await pool.query(
            `select * from tasks where id=${id}`
        );
        if (results) {
            return results;
        }
        return null;
    },
    async getOne(id) {
        const [results] = await pool.query(
            `select * from tasks where id=${id}`
        );
        const task = results[0];
        if (task.length > 0) {
            task.isCompleted = task.isCompleted == 1;
            return task;
        }

        return null;
    },
    async create(data) {
        if (data) {
            const values = Object.values(data);
            const query = `insert into tasks (title,isCompleted) values( ? , ? )`;
            const [results] = await pool.execute(query, values);
            if (results.insertId) {
                const task = await this.getOne(results.insertId);
                return task;
            }
            return results;
        }
        return null;
    },
    async update(id, data) {
        let para = "";
        if (data) {
            const keys = Object.keys(data);
            keys?.forEach((key, index) => {
                if (index === keys.length - 1) {
                    para += `${key} = ? `;
                } else {
                    para += `${key} = ? ,`;
                }
            });
            const values = Object.values(data);
            const tasks = await this.getById(id);
            if (tasks.length > 0) {
                const query = `update tasks set ${para} where id= ${id} `;
                const [results] = await pool.execute(query, values);
                return `updated ${tasks.length} row`;
            } else {
                return null;
            }
        }
        return null;
    },

    async del(id) {
        const query = `delete from tasks  where id= ${id}`;
        const task = await this.getById(id);
        if (task.length > 0) {
            const [results] = await pool.query(query);
            return `Deleted ${task.length} row`;
        }
        return null;
    },
};
module.exports = tasksModel;
