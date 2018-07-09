const FileCtrl = require('../controllers/file');
const ResCtrl = require('../controllers/response');
const IssueCtrl = require('../controllers/issue');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/fileUploader');


//upload 에러는 centralized error에서 처리됨
router.post('/issue', upload.single('file'), ResCtrl.post, FileCtrl.scan, IssueCtrl.search);

module.exports = router;