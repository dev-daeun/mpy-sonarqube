const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'Hi, koa.';
});


module.exports = router;