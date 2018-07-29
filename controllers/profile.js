const lang = require('../codes/language');
const field = require('../codes/field');
const uniqid = require('uniqid');

async function create(ctx, next){

    try{

        let t = ctx.state.t ? ctx.state.t : ctx.state.db;

        let timezone = new Date(),
            date = Date.now,
            rulesProfiles = [];

        for(let name of lang.names) {
            rulesProfiles.push({
                name: ctx.request.body.username + ' Rules',
                language: name,
                kee: uniqid(field.ruleProfilePrefix),
                rulesUpdatedAt: null,
                createdAt: timezone,
                updatedAt: timezone,
                isBuiltIn: false
            });
        }

        let firstResult = await t.batch([
            ctx.state.db.ruleProfile.createInBatch(rulesProfiles, t),
            ctx.state.db.organization.findInBatch({
                name: ctx.request.body.username
            }, t)
        ]);

        let orgProfile = [];
        let defaultProfile = [];

        for(let rp of firstResult[0]){
            orgProfile.push({
                uuid: uniqid(field.orgProfilePrefix),
                orgUid: firstResult[1][0].uuid,
                ruleProfileUid: rp.kee,
                createdAt: date,
                updatedAt: date
            });

            defaultProfile.push({
                orgUid: firstResult[1][0].uuid,
                language: rp.language,
                ruleProfileUid: rp.kee,
                createdAt: date,
                updatedAt: date
            })

        }

        await t.batch([
            ctx.state.db.orgProfile.createInBatch(orgProfile, t),
            ctx.state.db.defaultProfile.createInBatch(defaultProfile, t)
        ]);

        await next();

    }catch(err){
        ctx.throw(500, new Error('CreateProfileError: '+err.message));
    }


}

module.exports = {
    create
};