

async function search(ctx, next){
    try{

        let message = {
            login: ctx.state.user,
            projectUid: ctx.request.query.projectUid
        },
            issues = await ctx.state.db.issue.find(message);

        if(issues.length===0)
            ctx.throw(404, new Error('ProjectNotFound'));
        else
            ctx.body = issues.filter(x => x.id !== null);

        await next();

    }catch(err){
        ctx.throw(err.status, err);
    }
}

module.exports = {
    search
};