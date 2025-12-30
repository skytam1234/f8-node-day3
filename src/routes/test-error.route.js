const express = require("express");
const router = express.Router();
router.get("/test-success", (req, res) => {
    res.success({ message: "Hello World" });
});

module.exports = router;
