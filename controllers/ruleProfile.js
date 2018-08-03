const request = require('request-promise');
const lang = require('../codes/language');


async function create(ctx, next){
  try{
      request({
          uri: 'http://localhost:9000/api/qualityprofiles/activate_rule',
          method: 'POST',
          auth: {
              user: 'admin',
              pass: 'admin'
          },
          form: {
              severity: ctx.request.body.severity,
              profile_key: 'AWT_9zJb3qcyPegOrd42',
              rule_key: lang.plugin[ctx.request.body.language]+':'+ ctx.state.customKey
          }
      }).then(async body => {
          console.log(body);
          ctx.body = 'ok';
          await next();
      }).catch(err => {
          throw err;
      });
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