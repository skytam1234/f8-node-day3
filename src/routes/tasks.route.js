require("module-alias/register");
const {
    getAll,
    getOne,
    create,
    edit,
    del,
} = require("@/controllers/task.controller");
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id", edit);
router.delete("/:id", del);

module.exports = router;
