const ResCtrl = require('../controllers/response');
const RuleCtrl = require('../controllers/rule');
const tx = require('../controllers/transaction');
const Router = require('koa-router');
const router = new Router();



router.post('/rule', ResCtrl.post, tx.nestTrans, RuleCtrl.create, RuleCtrl.createProfile);

module.exports = router;