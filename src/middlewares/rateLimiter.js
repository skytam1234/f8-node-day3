let inFor = {};
function createRateLimiter(config) {
    const { windowMs, maxRequests, message } = config;
    return (req, res, next) => {
        const ip = req.ip;
        if (!inFor[ip]) {
            inFor[ip] = 0;
            setTimeout(() => {
                delete inFor[ip];
            }, windowMs);
        }
        inFor[ip]++;
        if (inFor[ip] > maxRequests) {
            return res.error(429, message);
        }
        next();
    };
}
const apiRateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 100,
    message: "Too many requests",
});
module.exports = apiRateLimiter;
