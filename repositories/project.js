const sql = require('../sqls/queryFile');


class ProjectRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findAllInBatch(params, t){
        return t.query(sql.project.findAll, params);
    }

    async findAll(params){
        return await this.db.any(sql.project.findAll, params);
    }

    findOneInBatch(params, t){
        return t.query(sql.project.findOne, params);
    }

    async findOne(params){
        return await this.db.any(sql.project.findOne, params);
    }
}

module.exports = ProjectRepository;