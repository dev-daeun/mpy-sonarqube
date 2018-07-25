const pgp = require('pg-promise');
const TransactionMode = pgp.txMode.TransactionMode;
const isolationLevel = pgp.txMode.isolationLevel;
const modes = new TransactionMode({
    tiLevel: isolationLevel.serializable,
    readOnly: true,
    deferrable: true
});



async function execTrans(ctx, next){
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


async function nestTrans(ctx, next){
    try{
        await ctx.state.db.tx({modes}, async t1 => {
            try{
                ctx.state.list = new Array();
                ctx.state.t1 = t1;
                await next();
                let result = await t1.batch(ctx.state.list);
                t1.tx(t2 => {
                    ctx.state.list.length = 0;
                    ctx.state.t2 = t2;

                        //create parameters, metadata, org profile, etc with result above.
                });
            }catch(err){
                throw err;
            }
        });
    }catch(err){
        ctx.throw(500, err);
    }

}

module.exports = {
    execTrans,
    nestTrans
};