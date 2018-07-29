const sql = require('../sqls/queryFile');
const ParamFormatter = require('../formatters/bulkInsert');

class DefaultProfileRepository {

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createInBatch(params, t){
        let values = new ParamFormatter(
            this.pgp,
            '${orgUid}, ${language}, ${ruleProfileUid}, ${createdAt}, ${updatedAt}',
            params);
        return t.query(sql.defaultProfile.create, {formatted: values});
    }

    async create(params){
        let values = new ParamFormatter(
            this.pgp,
            '${orgUid}, ${language}, ${ruleProfileUid}, ${createdAt}, ${updatedAt}',
            params);
        return await this.db.query(sql.defaultProfile.create, {formatted: values});
    }
}

module.exports = DefaultProfileRepository;
