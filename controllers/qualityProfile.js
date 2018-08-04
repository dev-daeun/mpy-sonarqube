const request = require("request-promise");
const redisConfig = require('../configs/redis');

/* rules profiles 등록 api */
/* 등록 후 들어오는 profile_key 로 project profile 과 active rule 해야 함. */

async function create(ctx, next){
    try{

        let qprofileName =[ctx.state.user, ctx.request.body.project].join('-');
        let body = await request({
            uri: 'http://localhost:9000/api/qualityprofiles/create',
            method: 'POST',
            auth: {
                user: 'admin',
                pass: 'admin'
            },
            form: {
                filename: null,
                name: qprofileName,
                language: ctx.request.body.language
            }
        });

        await ctx.state.redis.select(redisConfig.profileKeyDB);
        await ctx.state.redis.set(qprofileName, JSON.parse(body).profile.key, ctx.state.redis.print);

        await next();


    }catch(err){
        ctx.throw(500, new Error('CreateRuleProfileError: '+err.message));
    }
}



module.exports = {
    create
};

