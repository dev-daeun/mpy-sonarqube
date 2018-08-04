const request = require('request-promise');
const redisConfig = require('../configs/redis');

/* 프로젝트와 rules profile associating 하는 api */
async function create(ctx, next){
    try{

        await ctx.state.redis.select(redisConfig.profileKeyDB);
        let profileKey = await ctx.state.redis.getAsync([ctx.state.user, ctx.state.project.kee].join('-'));

        await request({
            uri: 'http://localhost:9000/api/qualityprofiles/add_project',
            method: 'POST',
            auth: {
                user: 'admin',
                pass: 'admin'
            },
            form: {
                profileKey: profileKey,
                projectUuid: ctx.request.body.projectUid
            }
        });

        await next();

    }catch(err){
        ctx.throw(500, new Error('CreateProjectProfileError: '+err.message));
    }
}

module.exports = {
    create
};