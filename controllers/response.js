
async function post(ctx, next){

    await next();
    ctx.response.status = 201;
}

async function get(ctx, next){

    await next();
    ctx.response.status = 200;
    ctx.response.body = ctx.body;
}

module.exports = {
    post,
    get
};