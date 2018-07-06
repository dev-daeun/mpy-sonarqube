const field = require('../configs/field');
const crypto = require('../utils/crypto');
const db = require('../utils/database');
const uniqid = require('uniqid');
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
        let date = Date.now(),
            crypted = await crypto.hashData(ctx.request.body.password),
            userMessage = {
                login: ctx.request.body.username,
                username: ctx.request.body.username,
                email: ctx.request.body.email,
                cryptedPassword: crypted.hashedData,
                extIdProvider: field.extIdProvider,
                salt: crypted.salt,
                createdAt: date,
                updatedAt: date
            },
            orgMessage = {
                uuid: uniqid(field.orgUidprefix),
                kee: ctx.request.body.username + field.orgDefaultKee ,
                name: ctx.request.body.username,
                createdAt: date,
                updatedAt: date
            };

        let UserRepo = db.user,
            OrgRepo = db.organization;

        await db.tx({modes}, async t => {
            try{
                const userQuery = UserRepo.create(userMessage, t);
                const orgQuery = OrgRepo.create(orgMessage, t);
                await t.batch([userQuery, orgQuery]);
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




