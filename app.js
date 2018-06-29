const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const index = require('./routes/code');
const app = new Koa();


app.use(bodyParser());
app.use(logger());
app.use(static(__dirname));


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
app.use(index.routes());
app.use(index.allowedMethods());



// Compress
app.use((ctx, next) => {
  ctx.compress = true;
});

if (!module.parent) {
  app.listen(6260);
  console.log('listening on port 6260');
}
