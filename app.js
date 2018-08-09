const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const db = require('./utils/postgresql');
const redis = require('./utils/redis');
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
    ctx.state.redis = redis;
    await next();
});

//centralized error
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        ctx.response.status = err.status;
        ctx.body = { message: err.status === 500 ? 'InternalServerError' : err.message };
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