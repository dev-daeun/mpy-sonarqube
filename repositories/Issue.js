const sql = require('../sqls/queryFile')


class IssueRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async select(){

        return await this.db.any(sql.issue.find);

    }
}

module.exports = IssueRepository;