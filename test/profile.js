/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());
const db = require('../utils/postgresql');
const test = require('../configs/test');

describe('user Routes', () => {

    before(async () => {
        await db.any('DELETE FROM rules_profiles \n' +
            'WHERE  id = (SELECT id FROM rules_profiles ORDER BY id desc LIMIT 1)');
    });


    it('save new profile', (done) => {
        request
            .post('/profile')
            .set({'authorization': test.jwt})
            .send({
                project: "python-beginner",
                language: "py"
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