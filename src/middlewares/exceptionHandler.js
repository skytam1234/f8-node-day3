const errorHandle = (error, req, res, next) => {
    res.error({ message: String(error) });
};
module.exports = errorHandle;
