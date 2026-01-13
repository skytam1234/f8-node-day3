require("module-alias/register");
const pool = require("../config/database");

const tasksModel = {
    async findAll() {
        const [results] = await pool.query("SELECT * FROM tasks");
        return results;
    },
    async findOne(id) {
        const [results] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
            id,
        ]);
        if (results.length > 0) {
            return results[0];
        }
        return null;
    },
    async create(data) {
        if (!data || !data.title) {
            return null;
        }
        const key = Object.keys(data).join(",");
        const values = Object.values(data);

        const valuesStr = Object.values(data)
            .map(() => "?")
            .join(",");

        const query = `INSERT INTO tasks (${key}) VALUES (${valuesStr})`;
        console.log(query);
        const [results] = await pool.execute(query, values);

        if (results.insertId) {
            const task = await this.findOne(results.insertId);
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
        return results.affectedRows;
    },

    async destroy(id) {
        const query = `delete from tasks  where id= ? `;
        const [results] = await pool.query(query, [id]);
        return results.affectedRows;
    },
};
module.exports = tasksModel;
