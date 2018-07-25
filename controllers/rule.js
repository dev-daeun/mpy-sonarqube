const plugin = require('../codes/rulePlugin');
const field = require('../codes/field');
const uniqid = require('uniqid');

/**
 * Rule controller.
 * @module repositories/rule
 */

async function create(ctx, next){
    try{

        let date = Date.now();
        let message = {
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
        let rule = ctx.state.db.rule;

        if(ctx.state.t){
            let createRule = rule.createInBatch(message, ctx.state.t);
            ctx.state.list.push(createRule);
        }
        else
            await rule.create(message);

        await next();
    }catch(err){
        ctx.throw(500, new Error('CreateRuleError:' +err.message));
    }
}

async function createProfile(ctx, next){
    try{
        let date = new Date(),
            message = {
                name: 'Custom Rules',
                language: ctx.request.body.language,
                kee: uniqid(field.ruleProfilePrefix),
                rulesUpdatedAt: date,
                createdAt: date,
                updatedAt: date,
                isBuiltIn: false
            };

        let rule = ctx.state.db.rule;

        if(ctx.state.t)
            ctx.state.list.push(rule.createProfileInBatch(message, ctx.state.t));
        else
            ctx.state.ruleProfile = await rule.createProfile(message);

        await next();

    }catch(err){
        ctx.throw(500, new Error('CreateRuleProfileError:' +err.message));
    }
}



module.exports = {
    /**
     * Blend two colors together.
     * @param {string} color1 - The first color, in hexadecimal format.
     * @param {string} color2 - The second color, in hexadecimal format.
     * @return {string} The blended color.
     */
    create,
    createProfile
};



