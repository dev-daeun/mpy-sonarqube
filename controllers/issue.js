

//postgreSQL에서 스캔결과 조회
async function search(ctx, next){
    try{

        let message = {
            login: ctx.state.user,
            projectKee: ctx.request.query.fileKey
        };

        if(ctx.state.t)
            ctx.body = await ctx.state.t.batch([
                ctx.state.db.issue.findInBatch(message, ctx.state.t)
            ]);
        else
            ctx.body = await ctx.state.db.issue.find(message);

        await next();

    }catch(err){
        ctx.throw(500, new Error("SearchIssueError:"+err.message));
    }
}

module.exports = {
    search
};