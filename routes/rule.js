const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();



router.post('/rule', Ctrl.Response.post, Ctrl.Trans.exec, Ctrl.Rule.create);

module.exports = router;