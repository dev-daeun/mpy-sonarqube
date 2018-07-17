const plugMapper = require('../utils/pluginMapper');


/*
*
*       "type": "XpathRule" <- [XpathRule, RegEx, disallow ] : rules.plugin_rule_key와 매핑됨.
*       "name": "customRuleForReqeustTest",
        "description": "this is for testing request",
        "severity": 3,
        "status": "READY",
        "language": "py",
        "purpose": 1 <- [code smell, vulnerability, bug ],
        

* */
async function create(ctx, next){

    let date = Date.now();
    let message = {
        type: ctx.request.body.type,
        name: ctx.request.body.name,
        pluginName: plugMapper[ctx.request.body.language],
        description: ctx.request.body.description,
        severity: ctx.request.body.severity,
        status: ctx.request.body.status,
        language: ctx.request.body.language,
        purpose: ctx.request.body.purpose,
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

}

module.exports = {
    create
};