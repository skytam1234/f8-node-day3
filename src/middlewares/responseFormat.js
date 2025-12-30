const response = (_, res, next) => {
    res.success = (data, status = 200) => {
        res.status(status).json({
            status: "success",
            data,
        });
    };
    res.error = (error, status = 400) => {
        res.status(status).json({
            status: "error",
            error,
        });
    };
    res.response = (message, status = 200) => {
        res.status(status).json({
            status: "success",
            message,
        });
    };
    next();
};
module.exports = response;
