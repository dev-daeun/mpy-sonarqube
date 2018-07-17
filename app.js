const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const db = require('./utils/database');
const authConfig = require('./configs/auth.js');
const app = new Koa();


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

// app.use(jwt({ secret: authConfig.jwtKey }));

app.use(require('./routes/issue').routes());
app.use(require('./routes/issue').allowedMethods());


app.use(require('./routes/rule').routes());
app.use(require('./routes/rule').allowedMethods());

if (!module.parent) {
  app.listen(6260);
  console.log('listening on port 6260');
}

