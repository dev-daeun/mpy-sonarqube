const CodeCtrl = require('../controllers/code');
const ResCtrl = require('../controllers/response');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/FileUploader');


//upload 에러는 centralized error에서 처리됨
router.post('/code', upload.single('file'), ResCtrl.post, CodeCtrl.scanFile, CodeCtrl.getResult);
router.post('/user', )

module.exports = router;