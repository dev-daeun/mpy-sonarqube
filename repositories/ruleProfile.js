const sql = require('../sqls/queryFile')


class RuleProfileRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findInBatch(params, t){
        return t.query(sql.ruleProfile.find, params);
    }

    async find(params){
        return await this.db.any(sql.ruleProfile.find, params);
    }

}

module.exports = RuleProfileRepository;