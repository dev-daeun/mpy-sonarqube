const sql = require('../sqls/queryFile')

class RuleRepository{

        constructor(db, pgp){
            this.db = db;
            this.pgp = pgp;
        }

        createInBatch(params, t){
            return t.query(sql.rule.create, params);
        }

        async create(params){
            return await this.db.any(sql.rule.create, params);
        }

}

module.exports = RuleRepository;