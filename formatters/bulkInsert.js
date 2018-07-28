
class BulkInsert{
    constructor(pgp, template, data){
        this.rawType = true;
        this.toPostgres = () => data.map(d => '(' + pgp.as.format(template, d) + ')').join();
    }
}

module.exports = BulkInsert;