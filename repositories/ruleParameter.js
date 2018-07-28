const sql = require('../sqls/queryFile')
const ParamFormatter = require('../formatters/bulkInsert');


class RuleParameterRepository{

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }


    createInBatch(params, t) {
        let values = new ParamFormatter(this.pgp, '${ruleId}, ${name}, ${paramType}, ${defaultValue}', params);
        return t.query(sql.ruleParameter.create, {formatted: values});
    }

    async create(params) {
        let values = new ParamFormatter(this.pgp, '${ruleId}, ${name}, ${paramType}, ${defaultValue}', params);
        return this.db.query(sql.ruleParameter.create, {formatted: values});
    }

    createActiveInBatch(params, t){
        let values = new ParamFormatter(this.pgp, '${activeId}, ${parameterId}, ${value}, ${paramKey}', params);
        return t.query(sql.ruleParameter.createActive, {formatted: values});
    }

    async createActive(params){
        let values = new ParamFormatter(this.pgp, '${activeId}, ${parameterId}, ${value}, ${paramKey}', params);
        return await this.db.query(sql.ruleParameter.createActive, {formatted: values});
    }
}

module.exports = RuleParameterRepository;
