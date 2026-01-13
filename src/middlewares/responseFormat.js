const response = (_, res, next) => {
    res.success = (data, status = 200) => {
        res.status(status).json({
            status: "success",
            data,
        });
    };
    res.error = (status, message, error = null) => {
        res.status(status).json({
            status: "error",
            message: message,
            error,
        });
    };

    next();
};
module.exports = response;
