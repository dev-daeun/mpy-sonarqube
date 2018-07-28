const dbConfig = require('../configs/postgresql');
const Repo = require('../repositories/repoFile');
const monitor = require('../monitor');

const initOptions = {
    promiseLib: Promise,
    extend(obj, dc) {
        obj.issue = new Repo.Issue(obj, pgp);
        obj.user = new Repo.User(obj, pgp);
        obj.organization = new Repo.Organization(obj, pgp);
        obj.usertoken = new Repo.UserToken(obj, pgp);
        obj.rule = new Repo.Rule(obj, pgp);
        obj.ruleParameter = new Repo.RuleParameter(obj, pgp);
        obj.ruleProfile = new Repo.RuleProfile(obj, pgp);
        obj.orgProfile = new Repo.OrgProfile(obj, pgp);
        obj.defaultProfile = new Repo.DefaultProfile(obj, pgp);
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


