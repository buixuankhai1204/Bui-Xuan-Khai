var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var errorHandle = require('./Controllers/ErrorHandleController')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topScoresRouter = require('./routes/topScores');
const AppError = require("./Ultilities/AppError");
var cors = require('cors')

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/scoreBoard', topScoresRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandle);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    const redis = require('ioredis');
    const subscriber = new redis();
    subscriber.subscribe('score-updates');
    subscriber.on('message', (channel, message) => {
        // Khi có thông báo mới từ Redis, gửi dữ liệu tới tất cả người dùng kết nối
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log(message);
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        // Đóng kết nối khi người dùng rời đi
        subscriber.unsubscribe('score-updates');
    });
});

module.exports = app;
