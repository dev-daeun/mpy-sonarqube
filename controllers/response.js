
async function post(ctx, next){
    try{

        await next();
        ctx.response.status = 201;
        ctx.response.body = ctx.body;

    }catch(err){
        ctx.throw(500, new Error("ResponseError : "+err.message));
    }
}

module.exports = {
    post
};