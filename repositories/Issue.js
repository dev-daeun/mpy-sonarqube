const sql = require('../sqls/queryFile')


class IssueRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findInBatch(params, t){
        return t.query(sql.issue.find, params);
    }

    async find(params){
        return await this.db.any(sql.issue.find, params);
    }
}

module.exports = IssueRepository;