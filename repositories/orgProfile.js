const sql = require('../sqls/queryFile');
const ParamFormatter = require('../formatters/bulkInsert');

class OrgProfileRepository {

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createInBatch(params, t){
        let values = new ParamFormatter(
            this.pgp,
            '${uuid}, ${orgUid}, ${ruleProfileUid}, ${createdAt}, ${updatedAt}',
            params);
        return t.query(sql.orgProfile.create, {formatted: values});
    }

    async create(params){
        let values = new ParamFormatter(
            this.pgp,
            '${uuid}, ${orgUid}, ${ruleProfileUid}, ${createdAt}, ${updatedAt}',
            params);
        return await this.db.query(sql.orgProfile.create, {formatted: values});
    }

    findInBatch(params, t){
        return t.query(sql.orgProfile.find, params);
    }

    async find(params){
        return await this.db.query(sql.orgProfile.find, params);
    }
}

module.exports = OrgProfileRepository;
