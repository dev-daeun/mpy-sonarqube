const random = require('crypto-random-string');
const db = require('../utils/database');
const sql = require('../sqls/queryFile');
const pgp = require('pg-promise');
const TransactionMode = pgp.txMode.TransactionMode;
const isolationLevel = pgp.txMode.isolationLevel;
const modes = new TransactionMode({
    tiLevel: isolationLevel.serializable,
    readOnly: true,
    deferrable: true
});

async function enrollUser(ctx, next){
    try{

        let cryptedPassword = "password will be crypted";
        let salt = 'salt';
        let userMessage = {
            login: ctx.request.body.username,
            username: ctx.request.body.username,
            email: ctx.request.body.email,
            scmAccounts: ctx.request.body.gitAccount,
            cryptedPassword: cryptedPassword,
            salt: salt
        };

        await db.tx(async t => {
            try{
                const userQuery = t.query(sql.user.create, userMessage);
                await t.batch([userQuery]);
            }catch(err){
                throw err;
            }

        });


        await next();

    }catch(err){
        ctx.throw(500, new Error('enrollUserError :' +err.message));
    }
}






module.exports = {
    enrollUser
};




