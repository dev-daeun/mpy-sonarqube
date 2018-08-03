/*global describe, it*/
'use strict';
const superagent = require('supertest');
const app = require('../app');
const request = superagent(app.listen());
const db = require('../utils/database');
const test = require('../configs/test');





describe('rule Routes', () => {

    before(async () => {
        await db.any('DELETE FROM active_rule_parameters \n' +
                     'WHERE active_rule_id IN (SELECT id \n' +
                                               'FROM  active_rules \n' +
                                               'WHERE profile_id IN (SELECT id \n' +
                                                                    'FROM  rules_profiles \n' +
                                                                    'WHERE NAME = \'kde6260 Rules\'))');
        await db.any('DELETE FROM rules_parameters \n' +
                     'WHERE  rule_id = ( SELECT id \n' +
                     'FROM   rules \n' +
                     'WHERE  NAME = \'new customized rule for testing\') ');

        await db.any('DELETE FROM active_rules \n' +
            'WHERE  profile_id IN ( SELECT id \n' +
            'FROM   rules_profiles \n' +
            'WHERE  NAME = \'kde6260 Rules\') ');


        await db.any('DELETE FROM rules \n' +
                     'WHERE name = \'new customized rule for testing\'');

    });


    it('save new customized rule', (done) => {
        request
            .post('/rule')
            .set({'authorization': test.jwt})
            .send({
                name: 'new customized rule for testing',
                projectUid: 'AWT-4WS23qcyPegOrd39',
                description: 'this is from mocha tester',
                severity: 'MAJOR',
                status: 'BETA',
                language: 'py',
                ruleType: 1,
                parameters: [
                    {
                        name: 'message',
                        value: '!!!heheheehehe var length must be longer !!!',
                    },
                    {
                        name: 'xpathQuery',
                        value: '//IDENTIFIER[string-length(@tokenValue)<6]'
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




