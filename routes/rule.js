const ResCtrl = require('../controllers/response');
const RuleCtrl = require('../controllers/rule');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/fileUploader');



router.post('/rule', ResCtrl.post, ResCtrl.execTrans, RuleCtrl.create);

module.exports = router;