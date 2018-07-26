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

        createProfileInBatch(params, t){
            return t.query(sql.rule.createProfile, params);
        }

        async createProfile(params){
            return await this.db.any(sql.rule.createProfile, params);
        }

        createParametersInBatch(params, t) {
            return t.batch(params.map(p => {
                return t.query(sql.rule.createParameter, p);
            }));
        }

        async createParameters(params) {
            return await this.db.batch(params.map(p => {
                return db.query(sql.rule.createParameter, p);
            }));
        }

        createActiveInBatch(params, t){
            return t.query(sql.rule.createActive, params);
        }

        async createActive(params){
            return await this.db.any(sql.rule.createActive, params);
        }

}

module.exports = RuleRepository;