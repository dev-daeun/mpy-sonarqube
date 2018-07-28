const sql = require('../sqls/queryFile');

class DefaultProfileRepository {

    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createInBatch(params, t){
        return t.query(sql.defaultProfile.create, params);
    }

    async create(params){
        return await this.db.query(sql.defaultProfile.create, params);
    }
}

module.exports = DefaultProfileRepository;
