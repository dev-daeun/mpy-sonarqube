const plugin = require('../codes/rulePlugin').plugin;
const field = require('../codes/field');
const uniqid = require('uniqid');

async function create(ctx, next){

    try{

        let t = ctx.state.t ? ctx.state.t : ctx.state.db;

        let timezone = new Date(),
            date = Date.now,
            rulesProfiles = [];

        for(let key of Object.keys(plugin)) {
            rulesProfiles.push({
                name: ctx.request.body.username + ' Rules',
                language: plugin[key],
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
        for(let rp of firstResult[0]){
            orgProfile.push({
                uuid: uniqid(),
                orgUid: firstResult[1][0].uuid,
                ruleProfileUid: rp.kee,
                createdAt: date,
                updatedAt: date
            });
        }

        let secondResult = await t.batch([
            ctx.state.db.orgProfile.createInBatch(orgProfile, t)
        ]);


        await next();
    }catch(err){
        ctx.throw(500, new Error('CreateProfileError: '+err.message));
    }


}

module.exports = {
    create
};