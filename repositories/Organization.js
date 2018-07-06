const sql = require('../sqls/queryFile')


class OrganizationRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async find(){

        return await this.db.any(sql.organization.find);

    }

    async create(orgMessage, t){
        if(t)
            return t.none(sql.organization.create, orgMessage);
        else
            return await this.db.any(sql.organization.create, orgMessage);

    }
}

module.exports = OrganizationRepository;