const sql = require('../sqls/queryFile');


class ProjectRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findByKeeInBatch(params, t){
        return t.query(sql.project.findByKee, params);
    }

    async findByKee(params){
        return await this.db.any(sql.project.findByKee, params);
    }

    findOneInBatch(params, t){
        return t.query(sql.project.findOne, params);
    }

    async findOne(params){
        return await this.db.any(sql.project.findOne, params);
    }
}

module.exports = ProjectRepository;