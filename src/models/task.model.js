require("module-alias/register");
const pool = require("../config/database");

const tasksModel = {
    async getAll() {
        const [results] = await pool.query("SELECT * FROM tasks");
        const data = results?.map((task) => ({
            ...task,
            isCompleted: task.isCompleted === 1,
        }));
        return data;
    },
    async getOne(id) {
        const [results] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
            id,
        ]);
        if (results.length > 0) {
            const task = results[0];
            task.isCompleted = task.isCompleted === 1;
            return task;
        }
        return null;
    },
    async create(data) {
        if (!data || !data.title) {
            return null;
        }
        const query = "INSERT INTO tasks (title, isCompleted) VALUES (?, ?)";
        const values = [data.title, data.isCompleted ? 1 : 0];
        const [results] = await pool.execute(query, values);

        if (results.insertId) {
            const task = await this.getOne(results.insertId);
            return task;
        }
        return null;
    },

    async update(id, data) {
        if (!data || Object.keys(data).length === 0) {
            return null;
        }
        let para = "";
        const keys = Object.keys(data);
        keys?.forEach((key, index) => {
            if (index === keys.length - 1) {
                para += `${key} = ? `;
            } else {
                para += `${key} = ? ,`;
            }
        });
        const values = Object.values(data);
        values.push(id);
        const query = `update tasks set ${para} where id= ? `;
        const [results] = await pool.execute(query, values);
        return `updated ${results.affectedRows} row`;
    },

    async del(id) {
        const query = `delete from tasks  where id= ? `;
        const [results] = await pool.query(query, [id]);
        console.log(results);
        return `Deleted ${results.affectedRows} row`;
    },
};
module.exports = tasksModel;
