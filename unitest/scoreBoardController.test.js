const request = require("supertest");
describe('Test All test cases controller of score board', () => {

    describe('shouldReturnTop10ScoreUsers', () => {
        it('shouldReturnTop10ScoreUsers', async () => {
            const res = await request(httpServer)
                .get(`/api/v1/scoreBoard/getTopScores`);
            expect(res.statusCode).toEqual(200)
        })
    })

    var token = ""
    describe('shouldReturnTokenAndUserIdWhenGameStart', () => {
        it('shouldReturnTokenAndUserIdWhenGameStart', async () => {
            const res = await request(httpServer)
                .send({userId: 2})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .post(`/api/v1/scoreBoard/gameStart`);
            expect(res.statusCode).toEqual(200);
            token = res.body.data.token;
        })
        it('shouldReturnAPIFailIfUserIdNotCorrect', async () => {
            const res = await request(httpServer)
                .send({userId: "xxxx"})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .post(`/api/v1/scoreBoard/gameStart`);
            expect(res.statusCode).toEqual(401);
        })
    })

    describe('shouldReturnRangeScoreOfTop10', () => {
        it('shouldReturnRangeScoreOfTop10', async () => {
            const res = request(httpServer)
                .get(`/api/v1/scoreBoard/rangeScore`)

            expect(res.statusCode).toEqual(200)
        })
    })

    describe('shouldReturnUserScoreWhenUpdate', () => {
        var objectId = {
            userId: 2,
            isTopScore: false,
            newScore: 5000,
            token: token
        };

        it('shouldReturnUserScoreWhenUpdate', async () => {
            const res = request(httpServer)
                .send({
                    userId: 2,
                    isTopScore: false,
                    newScore: 5000,
                    token: token
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .post(`/api/v1/scoreBoard/updateScores/${objectId.userId}`)
            expect(res.statusCode).toEqual(200)
        })

        it('shouldReturnFailIfRequestparamsNotCorrect', async () => {
            const res = request(httpServer)
                .send({
                    userId: "asfafs",
                    isTopScore: "false",
                    newScore: 5000,
                    token: token
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .post(`/api/v1/scoreBoard/updateScores/${objectId.userId}`)
            expect(res.statusCode).toEqual(401)
        })

        it('shouldReturnFailIfTokenNotCorrect', async () => {
            const res = request(httpServer)
                .send({
                    userId: 2,
                    isTopScore: false,
                    newScore: 5000,
                    token: "token is correct"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .post(`/api/v1/scoreBoard/updateScores/${objectId.userId}`)
            expect(res.statusCode).toEqual(401)
        })
    })
});

