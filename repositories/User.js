const sql = require('../sqls/queryFile')


class UserRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async select(){

        return await this.db.any(sql.user.find);

    }

    async insert(){

        return await this.db.any(sql.user.create);

    }
}

module.exports = UserRepository;