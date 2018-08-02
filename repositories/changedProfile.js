const sql = require('../sqls/queryFile');
const ParamFormatter = require('../formatters/bulkInsert');

class DefaultProfileRepository {

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createDefaultInBatch(params, t){
        return t.query(sql.changedProfile.createDefault, params);
    }

    async createDefault(params){
        return await this.db.query(sql.changedProfile.createDefault, params);
    }


}

module.exports = DefaultProfileRepository;
