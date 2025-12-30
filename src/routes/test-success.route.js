const express = require("express");
const router = express.Router();
router.get("/test-error", (req, res) => {
    throw Error("Test exception");
});

module.exports = router;
