
async function post(ctx, next){

    await next();
    ctx.response.status = 201;
    ctx.response.body = ctx.body;
}

module.exports = {
    post
};