/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());
const db = require('../utils/database');


describe('user Routes', () => {

    before(async () => {
        await db.any('DELETE FROM users \n' +
            'WHERE  name = \'kde6260\'');
        await db.any('DELETE FROM organizations \n' +
            'WHERE name = \'kde6260\'');
        await db.any('DELETE FROM user_tokens \n' +
            'WHERE login = \'kde6260\'');
    });


    it('save new user', (done) => {
        request
            .post('/user')
            .send({
                username: "kde6260",
                email: "kde6260@gmail.com",
                password: "momo1234"
            })
            .expect(201)
            .end((err, res) => {
                if(err){
                    console.log(err);
                    done(err);
                }
            });

    });
});