const dbConfig = require('../configs/postgresql');
const Issue = require('../repositories/Issue');
const User = require('../repositories/User');
const Organization = require('../repositories/Organization');
const UserToken = require('../repositories/UserToken');

const monitor = require('../monitor');

const initOptions = {
    promiseLib: Promise,
    extend(obj, dc) {
        obj.issue = new Issue(obj, pgp);
        obj.user = new User(obj, pgp);
        obj.organization = new Organization(obj, pgp);
        obj.usertoken = new UserToken(obj, pgp);
    },
    disconnect(client, dc) {
        const cp = client.connectionParameters;
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


