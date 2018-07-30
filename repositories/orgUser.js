const sql = require('../sqls/queryFile');


class OrgUserRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    createInBatch(params, t){
        return t.query(sql.orgUser.create, params);
    }

}

module.exports = OrgUserRepository;