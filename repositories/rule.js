const sql = require('../sqls/queryFile')
const ParamFormatter = require('./formatters/ruleParameter/insert');

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

        createProfileInBatch(params, t){
            return t.query(sql.rule.createProfile, params);
        }

        async createProfile(params){
            return await this.db.any(sql.rule.createProfile, params);
        }

        createParametersInBatch(params, t) {
            let values = new ParamFormatter(this.pgp, '${ruleId}, ${name}, ${paramType}, ${defaultValue}', params);
            return t.query(sql.rule.createParameter, {formatted: values});
        }


        async createParameters(params) {
            let values = new ParamFormatter(this.pgp, '${ruleId}, ${name}, ${paramType}, ${defaultValue}', params);
            return this.db.query(sql.rule.createParameter, {formatted: values});
        }

        createActiveInBatch(params, t){
            return t.query(sql.rule.createActive, params);
        }

        async createActive(params){
            return await this.db.any(sql.rule.createActive, params);
        }

}

module.exports = RuleRepository;