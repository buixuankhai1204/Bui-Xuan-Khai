const topScoresService = require('../Services/topScoresService');
const pubSubService = require('../Services/pubSubService');
module.exports = class todoList {
    static async getTopScores(req, res, next) {

        const topScores = await topScoresService.getTopScores(next);
        if (topScores) {
            res.status(200).json({
                status: "success",
                data: topScores,
                message: "get top scores success"
            })
        }
    }

    static async getRangeTopScore(req, res, next) {
        const rangeScores = await topScoresService.getRangeTopScore(next);
        if (rangeScores) {
            res.status(200).json({
                status: "success",
                data: rangeScores,
                message: "get range scores success"
            })
        }
    }

    static async updateUserScore(req, res, next) {
        const score = await topScoresService.updateUserScore(req.params.id, req.body.newScore, req.body.token, next);
        if (req.body.isTopScore) {
            await pubSubService.publisherSendMessage(next);
        }
        if (score) {
            res.status(201).json({
                status: "success",
                data: score,
                message: "create task success"
            })
        }
    }

    static async gameStart(req, res, next) {
        const match = await topScoresService.gameStart(req.body.userId, next);
        if (match) {
            res.status(201).json({
                status: "success",
                data: match,
                message: "update match game success"
            })
        }
    }

}