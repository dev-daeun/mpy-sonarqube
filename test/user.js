/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());
const db = require('../utils/database');


describe('user Routes', () => {

    // before(async () => {
    //     await db.any('DELETE FROM users \n' +
    //         'WHERE  Id = (SELECT Id \n' +
    //         '             FROM   users \n' +
    //         '             ORDER  BY Id DESC \n' +
    //         '             LIMIT  1) ');
    //     await db.any('DELETE FROM organizations \n' +
    //         'WHERE  uuid = (SELECT uuid \n' +
    //         '             FROM   organizations \n' +
    //         '             ORDER  BY created_at DESC \n' +
    //         '             LIMIT  1) ');
    //     await db.any('DELETE FROM user_tokens \n' +
    //         'WHERE  Id = (SELECT Id \n' +
    //         '             FROM   user_tokens \n' +
    //         '             ORDER  BY Id DESC \n' +
    //         '             LIMIT  1) ');
    //     await db.any('DELETE FROM rules_profiles \n' +
    //         'WHERE  Id = (SELECT Id \n' +
    //         '             FROM   rules_profiles \n' +
    //         '             ORDER  BY Id DESC \n' +
    //         '             LIMIT  1) ');
    // });


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