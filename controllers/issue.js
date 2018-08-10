

//postgreSQL에서 스캔결과 조회
async function search(ctx, next){
    try{

        let message = {
            login: ctx.state.user,
            projectUid: ctx.request.query.projectUid
        };

        ctx.response.body = await ctx.state.db.issue.find(message);
        await next();

    }catch(err){
        ctx.throw(err.status, err);
    }
}

module.exports = {
    search
};