const sql = require('../sqls/queryFile')


class UserRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }


    createInBatch(params, t){
        return t.query(sql.user.create, params);
    }

    async create(params){
        return await this.db.any(sql.user.create, params);
    }

    async find(params){
        return await this.db.any(sql.user.find, params);
    }
}

module.exports = UserRepository;