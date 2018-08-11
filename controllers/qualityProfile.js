const request = require("request-promise");
const redisConfig = require('../configs/redis');
const admin = require('../configs/admin');

async function create(ctx, next){
    try{

        if (!ctx.request.body.projectUid || !ctx.request.body.language)
            ctx.throw(400, new Error('ParameterRequired'));

        let project = await ctx.state.db.project.findOne({
                column: 'project_uuid',
                value: ctx.request.body.projectUid
            });
        if(project.length===0)
            ctx.throw(404, new Error('ProjectNotFound'));


        let profile = await ctx.state.db.ruleProfile.find({
            column: 'name',
            value: project[0].kee
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
                name: project[0].kee,
                language: ctx.request.body.language
            }
        });

        await ctx.state.redis.select(redisConfig.profileKeyDB);
        await ctx.state.redis.set(project[0].kee, JSON.parse(body).profile.key, ctx.state.redis.print);

        ctx.body = {};
        await next();


    }catch(err){
        ctx.throw(err.status, err);
    }
}



module.exports = {
    create
};

