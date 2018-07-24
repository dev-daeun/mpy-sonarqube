const dbConfig = require('../configs/postgresql');
const Issue = require('../repositories/issue');
const User = require('../repositories/user');
const Organization = require('../repositories/organization');
const UserToken = require('../repositories/usertoken');
const Rule = require('../repositories/rule');
const monitor = require('../monitor');

const initOptions = {
    promiseLib: Promise,
    extend(obj, dc) {
        obj.issue = new Issue(obj, pgp);
        obj.user = new User(obj, pgp);
        obj.organization = new Organization(obj, pgp);
        obj.usertoken = new UserToken(obj, pgp);
        obj.rule = new Rule(obj, pgp);
    },
    error(err, e) {
        monitor.error(err, e);
        if (e.cn)
            return console.error("DBConnectionError : "+err.message);

        if (e.query || e.params)
            return console.error("QueryingError : ", err.message);

        if (e.ctx)
            console.error("TransactionError : ", err.message);
    },
    task(e){
        monitor.task(e);
    }

};

monitor.attach(initOptions);

// Loading and initializing the library:
const pgp = require('pg-promise')(initOptions);
const db = pgp(dbConfig);



module.exports = db;


