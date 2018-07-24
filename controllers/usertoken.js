const crypto = require('../utils/crypto');


async function create(ctx, next){
    try{

        let token = await crypto.getRandomString(30),
            hashed = crypto.hashData(token);
        let message = {
                login: ctx.request.body.username,
                name: ctx.request.body.username + await crypto.getRandomString(10),
                hashed: hashed,
                date: Date.now()
        };
        let usertoken = ctx.state.db.usertoken;

        if(ctx.state.t){
            let createToken = usertoken.createInBatch(message, ctx.state.t);
            ctx.state.list.push(createToken);
        }
        else
            await usertoken.create(message);

        await next();

    }catch(err){
        ctx.throw(500, new Error('CreateTokenError:' +err.message));
    }

}

async function search(ctx, next){
    try{

        let sonartoken = await ctx.state.db.usertoken.find({
            login: ctx.state.user
        });
        ctx.state.sonartoken = sonartoken[0]['token_hash'];

        await next();

    }catch(err){
        ctx.throw(500, new Error('VerifyTokenError :' +err.message));
    }
}


module.exports = {
    create,
    search

}
