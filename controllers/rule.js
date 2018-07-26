const plugin = require('../codes/rulePlugin');
const field = require('../codes/field');
const uniqid = require('uniqid');

/**
 * Rule controller.
 * @module repositories/rule
 */


async function create(ctx, next){
    try{
        let date = Date.now(),
            timezone = new Date(),
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
            },
            profile = {
                name: 'Custom Rules',
                language: ctx.request.body.language,
                kee: uniqid(field.ruleProfilePrefix),
                rulesUpdatedAt: timezone,
                createdAt: timezone,
                updatedAt: timezone,
                isBuiltIn: false
            };

        let t;

        if(ctx.state.t) t = ctx.state.t;
        else t = ctx.state.db;

        await t.tx(async t1 => {
            try{

                let createRule = ctx.state.db.rule.createInBatch(rule, t1),
                    createProfile = ctx.state.db.rule.createProfileInBatch(profile, t1),
                    firstResult = await t1.batch([createRule, createProfile]);

                await t1.tx(async t2 => {
                    let ruleId = firstResult[0][0].id,
                        profileId = firstResult[1][0].id,
                        profileKee = firstResult[1][0].kee,
                        parameters =[
                            {
                                rule_id: ruleId,
                                name: ctx.request.body.parameters[0].name,
                                param_type: 'STRING',
                                default_value: ctx.request.body.parameters[0].value
                            },
                            {
                                rule_id: ruleId,
                                name: ctx.request.body.parameters[1].name,
                                param_type: 'STRING',
                                default_value: ctx.request.body.parameters[1].value
                            }
                        ],
                        activeRules = {
                            profileId: profileId,
                            ruleId: ruleId,
                            failureLevel: ctx.request.body.severity,
                            createdAt: date,
                            updatedAt: date
                        };

                    let createParameters = ctx.state.db.rule.createParametersInBatch(parameters, t2),
                        createActive = ctx.state.db.rule.createActiveInBatch(activeRules, t2),
                        secondResult = await t2.batch([createParameters, createActive]);
                    console.log(secondResult)
                });

                        //create parameters, metadata, org profile, etc with result above
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
     * @param {string} color1 - The first color, in hexadecimal format.
     * @param {string} color2 - The second color, in hexadecimal format.
     * @return {string} The blended color.
     */
    create
};



