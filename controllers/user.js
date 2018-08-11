const field = require('../codes/field');
const crypto = require('../utils/crypto');


async function create(ctx, next){
    try{
        let date = Date.now(),
            salt = await crypto.getRandomString(32),
            crypted = await crypto.hashDataWithSalt(ctx.request.body.password, salt),
            message = {
                login: ctx.request.body.username,
                username: ctx.request.body.username,
                email: ctx.request.body.email,
                cryptedPassword: crypted,
                extIdProvider: field.extIdProvider,
                salt: salt,
                createdAt: date,
                updatedAt: date
            };
        let user = ctx.state.db.user;
        if(ctx.state.t){
            let createdUser = await ctx.state.t.batch([
                ctx.state.db.user.createInBatch(message, ctx.state.t)
            ]);
            ctx.state.createdUser = createdUser;
        }
        else await user.create(message);
        ctx.body = {};
        await next();
    }catch(err){
        console.log("create user error : ", err.message);
        ctx.throw(err.status, err);
    }
}

async function searchByName(ctx, next){
    try{
        let userByName = await ctx.state.db.user.find({
            column: 'name',
            value: ctx.request.body.username
        });

        if(userByName.length>=1)
            ctx.throw(400, new Error('UsernameAlreadyExists'));
        else
            await next();

    }catch(err){
        console.log(err.message);
        ctx.throw(err.status, err);
    }

}

async function searchByEmail(ctx, next){
    try{
        let userByEmail = await ctx.state.db.user.find({
            column: 'email',
            value: ctx.request.body.email
        });

        if(userByEmail.length>=1)
            ctx.throw(400, new Error('EmailAlreadyExists'));
        else
            await next();

    }catch(err){
        console.log(err.message);
        ctx.throw(err.status, err);
    }

}
module.exports = {
    create,
    searchByName,
    searchByEmail
};




