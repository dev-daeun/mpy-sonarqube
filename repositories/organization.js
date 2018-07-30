const sql = require('../sqls/queryFile')


class OrganizationRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findInBatch(params, t){
        return t.query(sql.organization.find, params);
    }

    async find(){
        return await this.db.any(sql.organization.find, params);
    }

    createInBatch(params, t){
        return t.query(sql.organization.create, params);
    }

    async create(params){
        return await this.db.any(sql.organization.create, params);
    }
}

module.exports = OrganizationRepository;