const sql = require('../sqls/queryFile')


class IssueRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async find(params, t){
        if(t)
            return t.query(sql.issue.find, params);
        else
            return await this.db.any(sql.issue.find, params);

    }
}

module.exports = IssueRepository;