const fastify = require('fastify')({ logger: true });

let students = {};

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();