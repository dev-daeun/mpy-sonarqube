const sql = require('../sqls/queryFile')
const ParamFormatter = require('../formatters/bulkInsert');

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

        createActiveInBatch(params, t){
            return t.query(sql.rule.createActive, params);
        }

        async createActive(params){
            return await this.db.any(sql.rule.createActive, params);
        }

}

module.exports = RuleRepository;