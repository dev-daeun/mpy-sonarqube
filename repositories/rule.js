const sql = require('../sqls/queryFile')

class RuleRepository{

        constructor(db, pgp){
            this.db = db;
            this.pgp = pgp;
            this.paramSet = new this.pgp.helpers.ColumnSet(['rule_id', 'name', 'param_type', 'default_value'], {table: 'rules_parameters'});
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

        createParametersInBatch(params, t){
            return t.many(this.pgp.helpers.insert(params, this.paramSet) + 'RETURNING Id');
        }


        async createParameters(params){
            return await this.db.many(this.pgp.helpers.insert(params, this.paramSet) + 'RETURNING Id');
        }

        createActiveInBatch(params, t){
            return t.query(sql.rule.createActive, params);
        }

        async createActive(params){
            return await this.db.any(sql.rule.createActive, params);
        }

}

module.exports = RuleRepository;