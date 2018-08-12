const request = require('request-promise');
const redisConfig = require('../configs/redis');
const admin = require('../configs/admin');


/* 프로젝트와 rules profile associating 하는 api */
async function create(ctx, next){
    try{

        await ctx.state.redis.select(redisConfig.profileKeyDB);
        let profileKey = await ctx.state.redis.getAsync(ctx.state.project.kee);

        await request({
            uri: 'http://localhost:9000/api/qualityprofiles/add_project',
            method: 'POST',
            auth: {
                user: admin.user,
                pass: admin.pass
            },
            form: {
                profileKey: profileKey,
                projectUuid: ctx.request.body.projectUid
            }
        });

        await next();

    }catch(err){
        ctx.throw(err.status, err);
    }
}

module.exports = {
    create
};