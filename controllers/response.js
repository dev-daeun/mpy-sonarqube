
async function post(ctx, next){

    ctx.body = {};

    await next();

    ctx.response.status = 201;
    ctx.response.body = ctx.body;
    ctx.response.body.message = 'Created'
}

async function get(ctx, next){

    await next();
    ctx.status.body = ctx.body;
    ctx.response.status = 200;
}

module.exports = {
    post,
    get
};