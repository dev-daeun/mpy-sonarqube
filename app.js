const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const db = require('./utils/postgresql');
const redis = require('./utils/redis');
const app = new Koa();

const swagger = require('swagger-koa');
const swaggerUI = require('swagger-ui-koa');
const swaggerJSDOC = require('swagger-jsdoc');
const convert = require('koa-convert');
const mount = require('koa-mount');



//with jsdoc
// const options = {
//     swaggerDefinition: {
//         info: {
//             title: 'API', // Title (required)
//             version: '2.0.0', // Version (required)
//         },
//     },
//     apis: [
//         './controllers/user.js'
//     ],
// };

// Initialize swagger-jsdoc -> returns validated swagger spec in json formatters
// const swaggerSpec = swaggerJSDOC(options);
// app.use(swaggerUI.serve); //serve swagger static files
// app.use(convert(mount('/swagger', swaggerUI.setup(swaggerSpec)))); //mount endpoint for access
//

app.use(bodyParser({
    enableTypes: ['json', 'multipart/form-data'],
    jsonLimit: '256kb',
    formLimit: '256kb',
    extendTypes: {
        json: ['application/json']
    },
    onerror: (err, ctx) => {
        ctx.throw('BodyParsingError', 422);
    }


}));
app.use(logger());
app.use(static(__dirname));


app.use(async (ctx, next) => {
    ctx.compress = true;
    ctx.state.db = db;
    ctx.state.redis = redis;
    await next();
});

//centralized error
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});


app.use(require('./routes/user').routes());
app.use(require('./routes/user').allowedMethods());

app.use(require('./routes/issue').routes());
app.use(require('./routes/issue').allowedMethods());

app.use(require('./routes/rule').routes());
app.use(require('./routes/rule').allowedMethods());

app.use(require('./routes/profile').routes());
app.use(require('./routes/profile').allowedMethods());

if (!module.parent) {
  app.listen(6260);
  console.log('listening on port 6260');
}

module.exports = app;