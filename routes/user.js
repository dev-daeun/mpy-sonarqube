const ResCtrl = require('../controllers/response');
const UserCtrl = require('../controllers/user');
const Router = require('koa-router');
const router = new Router();



router.post('/user', ResCtrl.post, UserCtrl.enrollUser);

module.exports = router;