const todoListModel = require('../Models/todoListModel')
const AppError = require("../Ultilities/AppError");
module.exports = class todoListService {
    static async getAllTasks(queryString, next) {
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const listTasks = await todoListModel.find(JSON.parse(queryString));
        if (!listTasks) {
            return next(new AppError('can not get all task', 401));
        }

        return listTasks;
    }

    static async getTaskById(id, next) {
        const task = await todoListModel.find({_id: id});
        if (!task) {
            return next(new AppError('can not get task by id', 401));
        }
        return task;
    }

    static async createTask(taskObj, next) {
        console.log(taskObj);
        const task = await todoListModel.create({
            title: taskObj.title,
            projectName: taskObj.projectName,
        });

        if (!task) {
            return next(new AppError('can not create task', 401));
        }

        return task;
    }

    static async updateStateTask(id, isDone, next) {
        console.log("asfasf" + id)
        console.log(isDone)
        const task = await todoListModel.findByIdAndUpdate(id, {
            isDone: isDone,
        });

        if (!task) {
            return next(new AppError('can not update task by this id', 401));
        }

        return task;
    }

    static async deleteTaskByTitle(title, next) {
        const task = await todoListModel.deleteOne({
            title: title,
        });

        if (!task) {
            return next(new AppError('can not delete task by this title', 401));
        }

        return task;
    }
}