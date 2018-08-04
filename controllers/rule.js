const mapper = require('../codes/language');
const request = require('request-promise');


/**
 * Rule controller.
 * @module repositories/rule
 */
function createParams(name, key, description, parameters){
    let p1 = 'name=' + name;
    let p2 = 'key='+key;
    let p3 = 'markdown_description='+description;
    let p4 = parameters[0].name + '=' + parameters[0].value;
    let p5 = parameters[1].name + '=' + parameters[1].value;

    return [p1, p2, p3, p4, p5].join(';');
}


/* 룰 등록 api */
async function create(ctx, next){
    try{
        let name = ctx.request.body.name;
        let description = ctx.request.body.description;
        let customKey = ctx.request.body.name.split(' ').join('_');

        await request({
            uri: 'http://localhost:9000/api/rules/create',
            method: 'POST',
            auth: {
                user: 'admin',
                pass: 'admin'
            },
            form: {
                name: name,
                markdown_description: description,
                type: ctx.request.body.type,
                severity: ctx.request.body.severity,
                status: ctx.request.body.status,
                template_key: mapper.templateKey[ctx.request.body.language],
                custom_key: customKey,
                prevent_reactivation: true,
                params: createParams(name, customKey, description, ctx.request.body.parameters)
            }
        });

        ctx.state.customKey = customKey;
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



