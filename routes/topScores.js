var express = require('express');
var router = express.Router();
var catchError = require('../Ultilities/CatchError');
var todoListController = require('../Controllers/todoListController');
var topScoreController = require('../Controllers/topScoreController');

router.route('/getTopScores').get(catchError(topScoreController.getTopScores))
router.route('/updateScores/:id').post(catchError(topScoreController.updateUserScore))
router.route('/gameStart').post(catchError(topScoreController.gameStart))
router.route('/rangeScore').get(catchError(topScoreController.getRangeTopScore))
module.exports = router;
