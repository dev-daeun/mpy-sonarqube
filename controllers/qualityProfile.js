const request = require("request-promise");
const redisConfig = require('../configs/redis');
const admin = require('../configs/admin');

async function create(ctx, next){
    try{

        if (!ctx.request.body.projectUid || !ctx.request.body.language)
            ctx.throw(400, new Error('ParameterRequired'));


        let profile = await ctx.state.db.ruleProfile.find({
            column: 'name',
            value: ctx.state.project.kee
        });

        if(profile.length>0)
            ctx.throw(405, new Error('ProfileAlreadyExists'));


        let body = await request({
            uri: 'http://localhost:9000/api/qualityprofiles/create',
            method: 'POST',
            auth: {
                user: admin.user,
                pass: admin.pass
            },
            form: {
                filename: null,
                name: ctx.state.project.kee.kee,
                language: ctx.request.body.language
            }
        });

        await ctx.state.redis.select(redisConfig.profileKeyDB);
        await ctx.state.redis.set(ctx.state.project.kee, JSON.parse(body).profile.key, ctx.state.redis.print);

        await next();


    }catch(err){
        ctx.throw(err.status, err);
    }
}



module.exports = {
    create
};

