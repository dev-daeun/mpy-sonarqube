const FileCtrl = require('../controllers/file');
const ResCtrl = require('../controllers/response');
const IssueCtrl = require('../controllers/issue');
const AuthCtrl = require('../controllers/auth');
const TokenCtrl = require('../controllers/usertoken');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/fileUploader');


//upload 에러는 centralized error에서 처리됨
router.post('/issue', ResCtrl.post,
                      AuthCtrl.verify,
                      TokenCtrl.search,
                      upload.single('file'),
                      FileCtrl.scan,
                      IssueCtrl.search);

module.exports = router;