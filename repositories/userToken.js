const sql = require('../sqls/queryFile')


class UserTokenRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }


    createInBatch(params, t){
        return t.none(sql.usertoken.create, params);
    }

    async create(params){
        return await this.db.any(sql.usertoken.create, params);
    }
}

module.exports = UserTokenRepository;