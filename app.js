
'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const index = require('./controllers/index');
const app = new Koa();


app.use(bodyParser());
app.use(logger());

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
