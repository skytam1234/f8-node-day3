require("module-alias/register");
const express = require("express");
const response = require("@/middleware/responseFormat");
const errorHandle = require("@/middleware/exceptionHandler");
const testSuccess = require("@/routes/test-success.route");
const testError = require("@/routes/test-error.route");
const apiRateLimiter = require("@/middleware/rateLimiter");
var cors = require("cors");
const appRoute = require("@/routes");
const notFoundHandle = require("@/middleware/notFoundHandler");
const app = express();
const port = 3000;
const allowedOrigins = [
    "http://localhost:5173",
    "https://skytam1234.github.io:443",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(response);
app.use(apiRateLimiter);
app.use(testSuccess);
app.use(testError);
app.use("/api", appRoute);
app.use(notFoundHandle);
app.use(errorHandle);
app.listen(port, () => {
    console.log("Running on localhost:" + port);
});
