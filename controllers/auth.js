
const crypto = require('../utils/crypto');
const jwt = require('../utils/jwt');


async function sign(ctx, next){
    try{
        let userByName = await ctx.state.db.user.find({
            column: 'name',
            value: ctx.request.body.username
        });

        if(userByName.length===0)
            ctx.throw (401, new Error('AuthenticationFailed'));

        if(!await crypto.verifyData(ctx.request.body.password, userByName[0].crypted_password, userByName[0].salt))
            ctx.throw (401, new Error('AuthenticationFailed'));

        let token = await jwt.sign(ctx.request.body.username);
        ctx.body = {
            token: token
        };
        await next();
    }catch(err){
        ctx.throw(err.status, err);
    }

}




async function verify(ctx, next){
    try{

        let [fail, claim] = await jwt.verify(ctx.request.header.authorization);

        if(fail){
            ctx.throw(401, new Error('InvalidToken'));
        } else {
            ctx.state.user = claim;
            await next();
        }

    }catch(err){
        ctx.throw(err.status, err);
    }
}

module.exports = {
    sign,
    verify
};
