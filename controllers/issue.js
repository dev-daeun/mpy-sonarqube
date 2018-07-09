const db = require('../utils/database');


//postgreSQL에서 스캔결과 조회
async function search(ctx, next){
    try{
        let message = {
            login: 'kde6260',
            projectKee: ctx.req.file.filename
        };

        let IssueRepo = db.issue,
            searchIssue = await IssueRepo.find(message);
            searchIssue = searchIssue.length > 0 ? searchIssue : 'clean';
        ctx.body = searchIssue;

        await next();

    }catch(err){
        ctx.throw(500, new Error("SearchIssueError:"+err.message));

    }

}

module.exports = {
    search
};