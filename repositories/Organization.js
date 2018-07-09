const sql = require('../sqls/queryFile')


class OrganizationRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    findInBatch(t){
        return t.query(sql.organization.find);
    }

    async find(){
        return await this.db.any(sql.organization.find);
    }

    createInBatch(params, t){
        return t.none(sql.organization.create, params);
    }

    async create(params){
        return await this.db.any(sql.organization.create, params);
    }
}

module.exports = OrganizationRepository;