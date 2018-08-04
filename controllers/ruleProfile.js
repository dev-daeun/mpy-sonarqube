const request = require('request-promise');
const lang = require('../codes/language');
const redisConfig = require('../configs/redis');

async function create(ctx, next){
  try{

      let message = {
          column: 'project_uuid',
          value: ctx.request.body.projectUid
      };
      let project = await ctx.state.db.project.findOne(message),
          projectName = project[0].kee,
          profileKey;

      await ctx.state.redis.select(redisConfig.profileKeyDB);
      profileKey = await ctx.state.redis.getAsync([ctx.state.user, projectName].join('-'));

      await request({
          uri: 'http://localhost:9000/api/qualityprofiles/activate_rule',
          method: 'POST',
          auth: {
              user: 'admin',
              pass: 'admin'
          },
          form: {
              severity: ctx.request.body.severity,
              profile_key: profileKey,
              rule_key: lang.plugin[ctx.request.body.language]+':'+ ctx.state.customKey
          }
      });


      ctx.state.project = project[0];
      await next();

  }catch(err){
      ctx.throw(500, new Error('CreateRuleProfileError: '+err.message));
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
        ctx.throw(500, new Error('SearchRuleProfileError: '+err.message));
    }

}

module.exports = {
    create,
    search

};