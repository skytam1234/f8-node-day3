let inFor = {};
function createRateLimiter(windowMs, maxRequests, message) {
    return (req, res, next) => {
        const ip = req.ip;
        if (!inFor[ip]) {
            inFor[ip] = 0;
            setTimeout(() => {
                inFor[ip] = 0;
            }, windowMs);
        }
        inFor[ip]++;
        if (inFor[ip] > maxRequests) {
            return res.error(message, 429);
        }
        next();
    };
}
const apiRateLimiter = createRateLimiter(60000, 100, "Too many requests");
module.exports = apiRateLimiter;
