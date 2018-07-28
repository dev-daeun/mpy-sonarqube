const sql = require('../sqls/queryFile');
const ParamFormatter = require('../formatters/bulkInsert');

class RuleProfileRepository {

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createInBatch(params, t){
        let values = new ParamFormatter(
            this.pgp,
            '${name}, ${language}, ${kee}, ${rulesUpdatedAt}, ${createdAt}, ${updatedAt}, ${isBuiltIn}',
            params);
        return t.query(sql.ruleProfile.create, {formatted: values});
    }

    async create(params){
        let values = new ParamFormatter(
            this.pgp,
            '${name}, ${language}, ${kee}, ${rulesUpdatedAt}, ${createdAt}, ${updatedAt}, ${isBuiltIn}',
            params);
        return this.db.query(sql.ruleProfile.create, {formatted: values});
    }

    findInBatch(params, t){
        return t.query(sql.ruleProfile.find, params);
    }

    async find(params){
        return await this.db.query(sql.ruleProfile.find, params);
    }
}

module.exports = RuleProfileRepository;