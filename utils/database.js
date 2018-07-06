const dbConfig = require('../configs/postgresql');
const promise = require('bluebird');
const Issue = require('../repositories/Issue');
const User = require('../repositories/User');
const Organization = require('../repositories/Organization');
const initOptions = {
    promiseLib: promise,
    extend(obj, dc) {
        obj.issue = new Issue(obj, pgp);
        obj.user = new User(obj, pgp);
        obj.organization = new Organization(obj, pgp);
    },
    disconnect(client, dc) {
        const cp = client.connectionParameters;
        console.log(cp.database + " disconnected");
    },
    error(err, e) {
        if (e.cn)
            return console.error("DBConnectionError : "+err.message);

        if (e.query || e.params)
            return console.error("QueryingError : ", err.message);

        if (e.ctx)
            console.error("TransactionError : ", err.message);
    }
};

// Loading and initializing the library:
const pgp = require('pg-promise')(initOptions);
const db = pgp(dbConfig);

const diagnostics = require('./diagnostics');
diagnostics.init(initOptions);
// Creating a new database instance from the connection details:

module.exports = db;


