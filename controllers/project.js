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

        ctx.response.body.issues = issues;

        await next();

    }catch(err){
        ctx.throw(err.status, err);
    }
}


module.exports = {
    searchByKee
};