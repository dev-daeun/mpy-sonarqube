const plugin = require('../codes/rulePlugin');
const field = require('../codes/field');
const uniqid = require('uniqid');

/**
 * Rule controller.
 * @module repositories/rule
 */

async function create(ctx, next){
    try{
        let t = ctx.state.t ? ctx.state.t : ctx.state.db;
        await t.tx(async t2 => {
            try{
                let date = Date.now(),
                    rule = {
                        name: ctx.request.body.name,
                        pluginRuleKey: ctx.request.body.name.split(' ').join('_'),
                        pluginName: plugin.rule[ctx.request.body.language],
                        description:  ctx.request.body.description,
                        priority: ctx.request.body.severity,
                        templateId: plugin.template[ctx.request.body.language],
                        status: ctx.request.body.status,
                        language: ctx.request.body.language,
                        isTemplate: false,
                        descriptionFormat: 'MARKDOWN',
                        ruleType: ctx.request.body.ruleType,
                        pluginKey: plugin.plugin[ctx.request.body.language],
                        createdAt: date,
                        updatedAt: date
                    };

                let firstResult = await t2.batch([
                    ctx.state.db.rule.createInBatch(rule, t2),
                    ctx.state.db.ruleProfile.findInBatch({
                        name: ctx.state.user,
                        language: ctx.request.body.language
                    }, t2)
                ]);

                let ruleId = firstResult[0][0].id,
                    profileId = firstResult[1][0].id,
                    parameters =[
                        {
                            ruleId: ruleId,
                            name: ctx.request.body.parameters[0].name,
                            paramType: 'STRING',
                            defaultValue: ctx.request.body.parameters[0].value
                        },
                        {
                            ruleId: ruleId,
                            name: ctx.request.body.parameters[1].name,
                            paramType: 'STRING',
                            defaultValue: ctx.request.body.parameters[1].value
                        }
                    ],
                    activeRules = {
                        profileId: profileId,
                        ruleId: ruleId,
                        failureLevel: ctx.request.body.severity,
                        createdAt: date,
                        updatedAt: date
                    };

                let secondResult = await t2.batch([
                        ctx.state.db.ruleParameter.createInBatch(parameters, t2),
                        ctx.state.db.rule.createActiveInBatch(activeRules, t2)
                    ]);

                let returnedParams = secondResult[0],
                    returnedActive = secondResult[1][0],
                    activeParameters = [
                        {
                            activeId: returnedActive.id,
                            parameterId: returnedParams[0].id,
                            value: returnedParams[0].value,
                            paramKey: returnedParams[0].name
                        },
                        {
                            activeId: returnedActive.id,
                            parameterId: returnedParams[1].id,
                            value: returnedParams[1].value,
                            paramKey: returnedParams[1].name
                        }
                    ];
                await t2.batch([
                    ctx.state.db.ruleParameter.createActiveInBatch(activeParameters, t2)
                ]);


            }catch(err){
                throw err;
            }
        });

        await next();
    }catch(err){
        ctx.throw(500, new Error('CreateRuleError:' +err.message));
    }
}




module.exports = {
    /**
     * Blend two colors together.
     * @param {string} color1 - The first color, in hexadecimal formatters.
     * @param {string} color2 - The second color, in hexadecimal formatters.
     * @return {string} The blended color.
     */
    create
};



