async function create(ctx, next){
    try{

        let orgUser = {
            userId: ctx.state.createdUser[0][0].id,
            orgUid: ctx.state.createdOrg[0][0].uuid
        };

        await ctx.state.t.batch([
            ctx.state.db.orgUser.createInBatch(orgUser, ctx.state.t)
        ]);

        await next();

    }catch(err){

    }
}

module.exports = {
    create
};