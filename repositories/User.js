const sql = require('../sqls/queryFile')


class UserRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async find(userEmail){

        return await this.db.any(sql.user.find, {
            userEmail: userEmail
        });

    }

    async create(){

        return await this.db.any(sql.user.create);

    }
}

module.exports = UserRepository;