require("module-alias/register");
const express = require("express");
const tasksRouter = require("@/routes/tasks.route");
const router = express.Router();
router.use("/tasks", tasksRouter);
module.exports = router;
