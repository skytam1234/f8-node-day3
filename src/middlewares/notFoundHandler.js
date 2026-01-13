const notFoundHandle = (req, res) => {
    res.error(404, { message: "404 Not Found" });
};
module.exports = notFoundHandle;
