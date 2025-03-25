import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).send({ message: 'Rate limit exceeded' });
            }

            if (decision.reason.isBot()) {
                // Avoid bot detection in Postman use -> User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
                return res.status(403).send({ message: 'Bot detected' });
            }

            return res.status(403).send({ message: 'Access denied' });
        }

        next();

    } catch (error) {
        console.log(`Arcjet Middleware error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;