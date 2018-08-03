const sql = require('../sqls/queryFile');


class ProjectRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findInBatch(params, t){
        return t.query(sql.project.find, params);
    }

    async find(params){
        return await this.db.any(sql.project.find, params);
    }
}

module.exports = ProjectRepository;