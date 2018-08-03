const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();



router.post('/profile',
    Ctrl.Response.post,
    Ctrl.Auth.verify,
    Ctrl.Profile.create);

module.exports = router;