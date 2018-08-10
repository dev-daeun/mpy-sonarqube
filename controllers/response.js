
async function post(ctx, next){

    await next();

    ctx.response.status = 201;
    ctx.response.body.message = 'Created'
}

async function get(ctx, next){

    await next();
    ctx.response.status = 200;
}

module.exports = {
    post,
    get
};