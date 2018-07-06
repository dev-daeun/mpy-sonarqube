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

    async create(userMessage, t){
    if(t)
       return t.none(sql.user.create, userMessage);
    else
       return await this.db.any(sql.user.create, userMessage);

    }
}

module.exports = UserRepository;