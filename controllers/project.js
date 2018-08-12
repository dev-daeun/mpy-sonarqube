async function searchByKee(ctx, next){
    try{

        let message = {
            column: 'kee',
            value: [ctx.state.user, ctx.state.fileKey].join(':')
        },
            project = await ctx.state.db.project.findOne(message);

        ctx.response.body = {
            projectUid: project[0].project_uuid
        };

        let issues = project.map(x => {
            let e = {
                id: x.id,
                line: x.line,
                message: x.message,
                severity: x.severity
            };
            return e;
        });

        ctx.body.issues = issues;

        await next();

    }catch(err){
        ctx.throw(err.status, err);
    }
}

async function searchByUid(ctx, next){
    try{
        let project = await ctx.state.db.project.findOne({
            column: 'project_uuid',
            value: ctx.request.body.projectUid
        });

        if(project.length===0)
            ctx.throw(404, new Error('ProjectNotFound'));
        else
            ctx.state.project = project[0];
        await next();
    }catch(err){
        ctx.throw(err.status, err);
    }
}

module.exports = {
    searchByKee,
    searchByUid
};