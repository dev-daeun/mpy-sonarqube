async function search(ctx, next){
    try{
        let message = {
            projectName: ctx.state.fileKey
        };

        let project;
        if(ctx.state.t)
            project = await ctx.state.t.batch([
                ctx.state.db.project.findInBatch(message, ctx.state.t)
            ]);
        else
            project = await ctx.state.db.project.find(message);

        ctx.body = {
            projectUid: project[0].project_uuid
        };
        await next();

    }catch(err){
        ctx.throw(500, new Error("SearchProjectError:"+err.message));
    }
}

module.exports = {
    search
};