const redis = require("redis");

let redisServer;
(async () => {
    redisServer = redis.createClient({
    });
    redisServer.on("error", (error) => console.log(`Error: ${error}`));
    redisServer = await redisServer.connect();
    return redisServer;
})();
module.exports = redisServer;