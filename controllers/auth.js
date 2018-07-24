
const crypto = require('../utils/crypto');
const jwt = require('../utils/jwt');


async function sign(ctx, next){
    try{
        let token = await jwt.sign(ctx.request.body.username);
        ctx.body = {
            token: token
        };
        await next();
    }catch(err){
        ctx.throw(500, new Error('AssignTokenError :' +err.message));
    }

}




async function verify(ctx, next){
    try{

        let claim = await jwt.verify(ctx.request.header.authorization);
        ctx.state.user = claim;
        await next();

    }catch(err){
        ctx.throw(500, new Error('VerifyTokenError :' +err.message));
    }
}

module.exports = {
    sign,
    verify
};
