const redisServer = require('../redisServer');
const topScoreRedis = require('../Services/topScoresService');
module.exports = class pubSubService {
    static async publisherSendMessage(next) {
        const topScore = await topScoreRedis.getTopScores(next);
        redisServer.publish('score-updates', JSON.stringify(topScore));
    }
}

