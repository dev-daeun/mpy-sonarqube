const request = require('request-promise');


/* 프로젝트와 rules profile associating 하는 api */
async function create(ctx, next){
    try{
        request({
            uri: 'http://localhost:9000/api/qualityprofiles/add_project',
            method: 'POST',
            auth: {
                user: 'admin',
                pass: 'admin'
            },
            form: {
                profileKey: 'AWT_9zJb3qcyPegOrd42',
                projectUuid: ctx.request.body.projectUid
            }
        }).then(async body => {
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