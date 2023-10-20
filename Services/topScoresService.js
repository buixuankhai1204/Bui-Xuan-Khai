const topScoresModel = require('../Models/topScoresModel');
const matchModel = require('../Models/matchModel');
const AppError = require("../Ultilities/AppError");
const crypto = require('crypto');
module.exports = class todoListService {
    static async getTopScores(next) {
        const topScores = await topScoresModel.aggregate([
            {
                $sort: {"score": -1},
            },
            {
                $limit: 10
            }
        ]);

        if (!topScores) {
            return next(new AppError('can not get top scores by id', 401));
        }

        return topScores;
    }

    static async updateUserScore(userId, newTopScore, token, next) {
        const match = await matchModel.find({userId: userId});
        if (match[0].token !== token) {
            return next(new AppError('you must complete the game!', 401));
        }

        const score = await topScoresModel.findOneAndUpdate({userId: userId}, {score: newTopScore}, {upsert: true});
        if (!score) {
            return next(new AppError('can not update score by this user id', 401));
        }

        return score;
    }

    static async getRangeTopScore(next) {
        const topScores = await topScoresModel.aggregate([
            {
                $sort: {"score": -1},
            },
            {
                $limit: 10
            }
        ]);
        if (!topScores) {
            return next(new AppError('can not get top scores by id', 401));
        }

        return [topScores[0].score, topScores[topScores.length - 1].score];

    }

    static async gameStart(userId, next) {
        console.log(userId)
        var token = crypto.randomBytes(64).toString('hex');

        const match = await matchModel.findOneAndUpdate({userId: userId}, {token: token}, {upsert: true});
        if (!match) {
            return next(new AppError('can not update task by this id', 401));
        }
    }

}