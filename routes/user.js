const ResCtrl = require('../controllers/response');
const UserCtrl = require('../controllers/user');
const OrgCtrl = require('../controllers/organization');
const TokenCtrl = require('../controllers/usertoken');
const AuthCtrl = require('../controllers/auth');
const tx = require('../controllers/transaction');
const Router = require('koa-router');
const router = new Router();




router.post('/user', ResCtrl.post,
                     tx.execTrans,
                     UserCtrl.create,
                     OrgCtrl.create,
                     TokenCtrl.create);

router.post('/login', ResCtrl.post, AuthCtrl.sign);

module.exports = router;