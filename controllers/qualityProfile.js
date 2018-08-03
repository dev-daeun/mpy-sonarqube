const request = require("request-promise");

/* rules profiles 등록 api */
/* 등록 후 들어오는 profile_key 로 project profile 과 active rule 해야 함. */

async function create(ctx, next){
    try{
        request({
            uri: 'http://localhost:9000/api/qualityprofiles/create',
            method: 'POST',
            auth: {
                user: 'admin',
                pass: 'admin'
            },
            form: {
                filename: null,
                name: ctx.state.user + ctx.request.body.project,
                language: ctx.request.body.language
            }
        }).then(async body => {
            ctx.state.ruleProfile = JSON.parse(body).profile.key;
            console.log(ctx.state.ruleProfile)
            ctx.body = 'ok';
            await next();
        }).catch(err => {
            throw err;
        });

    }catch(err){
        ctx.throw(500, new Error('CreateRuleProfileError: '+err.message));
    }
}



module.exports = {
    create
};

