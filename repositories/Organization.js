const sql = require('../sqls/queryFile')


class OrganizationRepository{
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async select(){

        return await this.db.any(sql.organization.find);

    }

    async insert(){

        return await this.db.any(sql.organization.create);

    }
}

module.exports = OrganizationRepository;