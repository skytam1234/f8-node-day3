const notFoundHandle = (req, res) => {
    res.error({ message: "404 Not Found" }, 404);
};
module.exports = notFoundHandle;
