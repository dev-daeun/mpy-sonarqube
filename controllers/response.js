
async function post(ctx, next){
    try{

        await next();
        ctx.response.status = 201;
        ctx.response.body = ctx.body;

    }catch(err){
        ctx.throw(500, err);
    }
}

module.exports = {
    post
};