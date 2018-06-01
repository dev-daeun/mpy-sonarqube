'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();

const index = require('./controllers/index');

app.use(index.routes())
app.use(index.allowedMethods())



// Logger
app.use(logger())

// Compress
app.use((ctx, next) => {
  ctx.compress = true
  ctx.body = fs.createReadStream(file)
})

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
