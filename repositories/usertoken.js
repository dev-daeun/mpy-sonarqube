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

    findInBatch(params, t){
        return t.query(sql.usertoken.find, params);
    }

    async find(params){
        return await this.db.any(sql.usertoken.find, params);
    }
}

module.exports = UserTokenRepository;