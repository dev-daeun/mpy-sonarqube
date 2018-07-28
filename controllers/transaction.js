const pgp = require('pg-promise');
const TransactionMode = pgp.txMode.TransactionMode;
const isolationLevel = pgp.txMode.isolationLevel;
const modes = new TransactionMode({
    tiLevel: isolationLevel.serializable,
    readOnly: true,
    deferrable: true
});



async function exec(ctx, next){
    try{
        await ctx.state.db.tx({modes}, async t => {
            try {
                ctx.state.list = new Array();
                ctx.state.t = t;
                await next();
                await t.batch(ctx.state.list);
            } catch (err) {
                throw err;
            }
        });

    }catch(err){
        ctx.throw(500, err);
    }
}



module.exports = {
    exec
};