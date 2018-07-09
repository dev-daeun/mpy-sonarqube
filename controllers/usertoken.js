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

        console.log(message);
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



module.exports = {
    create
}
