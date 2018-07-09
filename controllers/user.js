const field = require('../configs/field');
const crypto = require('../utils/crypto');


async function create(ctx, next){
    try{
        let date = Date.now(),
            crypted = await crypto.hashDataWithSalt(ctx.request.body.password),
            message = {
                login: ctx.request.body.username,
                username: ctx.request.body.username,
                email: ctx.request.body.email,
                cryptedPassword: crypted.hashedData,
                extIdProvider: field.extIdProvider,
                salt: crypted.salt,
                createdAt: date,
                updatedAt: date
            };
        let user = ctx.state.db.user;
        if(ctx.state.t){
            let createUser = user.createInBatch(message, ctx.state.t);
            ctx.state.list.push(createUser);
        }
        else await user.create(message);
        await next();
    }catch(err){
        ctx.throw(500, new Error('createUserError:' +err.message));
    }
}


module.exports = {
    create
};




