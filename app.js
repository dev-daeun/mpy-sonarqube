'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();

const index = require('./controllers/index');

// Logger
app.use(logger());


app.use(index.routes());
app.use(index.allowedMethods());



// Compress
app.use((ctx, next) => {
  ctx.compress = true;
});

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
