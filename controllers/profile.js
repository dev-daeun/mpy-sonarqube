const lang = require('../codes/language');
const field = require('../codes/field');
const uniqid = require('uniqid');

async function create(ctx, next){

    try{

        let t = ctx.state.t ? ctx.state.t : ctx.state.db;
        let user = ctx.request.body.username;

        let timezone = new Date(),
            date = Date.now(),
            rulesProfiles = []; //언어별 rules_profiles 리퍼지토리에 들어갈 파라미터


        for(let name of lang.names) {
            rulesProfiles.push({
                name: user + ' Rules',
                language: name,
                kee: uniqid(field.ruleProfilePrefix + name),
                rulesUpdatedAt: null,
                createdAt: timezone,
                updatedAt: timezone,
                isBuiltIn: false
            });
        }

        let [createdRuleProfile, foundOrg] = await t.batch([
            ctx.state.db.ruleProfile.createInBatch(rulesProfiles, t),
            ctx.state.db.organization.findInBatch({
                name: user
            }, t)
        ]);

        let orgProfile = [],
            defaultProfile = [],
            profileData = []; //언어별 qprofile_changes 리퍼지토리에 들어갈 파라미터


        for(let rp of createdRuleProfile){
            orgProfile.push({
                uuid: uniqid(field.orgProfilePrefix),
                orgUid: foundOrg[0].uuid,
                ruleProfileUid: rp.kee,
                createdAt: date,
                updatedAt: date
            });

            defaultProfile.push({
                orgUid: foundOrg[0].uuid,
                language: rp.language,
                ruleProfileUid: rp.kee,
                createdAt: date,
                updatedAt: date
            });

            profileData.push({
                user: user,
                date: date,
                ruleProfileUid: rp.kee,
                language: rp.language
            });
        }

        await t.batch([
            ctx.state.db.orgProfile.createInBatch(orgProfile, t),
            ctx.state.db.defaultProfile.createInBatch(defaultProfile, t)
        ]);

        await t.batch(profileData.map(data => ctx.state.db.changedProfile.createDefaultInBatch(data, t)));


        await next();

    }catch(err){
        ctx.throw(500, new Error('CreateProfileError: '+err.message));
    }


}

module.exports = {
    create
};