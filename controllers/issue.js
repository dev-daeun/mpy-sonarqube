
//postgreSQL에서 스캔결과 조회
async function search(ctx, next){
    try{
        let message = {
            login: ctx.state.user,
            projectKee: ctx.req.file.filename.split('.')[0]
        };

        let issue = ctx.state.db.issue;
        let searchIssue;
        if(ctx.state.t){
             searchIssue = issue.findInBatch(message, ctx.state.t);
            ctx.state.list.push(searchIssue);
        }
        else searchIssue = await issue.find(message);
        
        ctx.body = searchIssue;
        await next();

    }catch(err){
        ctx.throw(500, new Error("SearchIssueError:"+err.message));
    }
}

module.exports = {
    search
};