const request = require('request-promise');
const lang = require('../codes/language');
const redisConfig = require('../configs/redis');
const admin = require('../configs/admin');
const rule = require('../codes/rule');


async function create(ctx, next){
  try{

      await ctx.state.redis.select(redisConfig.profileKeyDB);

      await request({
          uri: 'http://localhost:9000/api/qualityprofiles/activate_rule',
          method: 'POST',
          auth: {
              user: admin.user,
              pass: admin.pass
          },
          form: {
              severity: rule.severity[ctx.request.body.severity],
              profile_key: await ctx.state.redis.getAsync(ctx.state.project.kee),
              rule_key: lang.plugin[ctx.request.body.language]+':'+ ctx.state.customKey
          }
      });

      await next();

  }catch(err){
      ctx.throw(err.status, err);
  }
}



async function search(ctx, next){
    try{

        let message = {
            user: ctx.state.user,
            projectUid: ctx.request.body.projectUid,
            language: ctx.request.body.language
        };

        let ruleProfile = await ctx.state.db.ruleProfile.find(message);
        ctx.state.ruleProfile = ruleProfile[0];

        await next();
    }catch(err){
        ctx.throw(err.status, err);
    }

}

module.exports = {
    create,
    search

};