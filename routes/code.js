const Ctrl = require('../controllers/code');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/FileUploader');


//upload 에러는 centralized error에서 처리됨
router.post('/code', upload.single('file'), Ctrl.scanFile);


module.exports = router;