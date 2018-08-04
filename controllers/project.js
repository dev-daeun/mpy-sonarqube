async function searchByKee(ctx, next){
    try{
        let message = {
            column: 'kee',
            value: ctx.state.fileKey
        };

        let project;
        if(ctx.state.t)
            project = await ctx.state.t.batch([
                ctx.state.db.project.findOneInBatch(message, ctx.state.t)
            ]);
        else
            project = await ctx.state.db.project.findOne(message);

        ctx.body = {
            projectUid: project[0].project_uuid
        };
        await next();

    }catch(err){
        ctx.throw(500, new Error("SearchProjectByKeeError:"+err.message));
    }
}


module.exports = {
    searchByKee
};