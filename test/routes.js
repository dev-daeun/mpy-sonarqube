/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());
const db = require('../utils/database');





describe('Routes', () => {

    before(async () => {
        await db.any('DELETE FROM rules \n' +
                     'WHERE  id = (SELECT id \n' +
                     '             FROM   rules \n' +
                     '             ORDER  BY id DESC \n' +
                     '             LIMIT  1) ');
    });


    it('save new customized rule', (done) => {
        request
            .post('/rule')
            .send({
                name: 'new customized rule for testing',
                description: 'this is from mocha tester',
                severity: 0,
                status: 'BETA',
                language: 'java',
                ruleType: 1,
                parameters: [
                    {
                        name: 'toClasses',
                        value: '*.View.*'
                    },
                    {
                        name: 'fromClasses',
                        value: '*.Dao.*'
                    }
                ]
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




