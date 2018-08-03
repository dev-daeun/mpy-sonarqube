const request = require("request");


async function create(ctx, next){
    try{
        return new Promise((resolve, reject) => {
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
            }, (err, response, body) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                resolve(body);

            });
        }).then(async body => {
            await next();
        }).catch(err => {
            throw err;
        })


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

