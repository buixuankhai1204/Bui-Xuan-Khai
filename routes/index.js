var express = require('express');
var router = express.Router();
var catchError = require('../Ultilities/CatchError');
var todoListController = require('../Controllers/todoListController');
const path = require("path");
/* GET home page. */

router.route('/getAllTask').get(catchError(todoListController.getAllTask))
router.route('/getTaskById/:id').get(catchError(todoListController.getTaskById))
router.route('/createTask').post(catchError(todoListController.createTasks))
router.route('/updateStateTask/:id').put(catchError(todoListController.updateStateTask))
router.route('/deleteTaskByTitle').delete(catchError(todoListController.deleteTaskByTitle))
router.get('/problem5', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/frontend/todolist.html'));
});
module.exports = router;
