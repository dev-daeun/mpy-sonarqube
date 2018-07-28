const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/fileUploader');


//upload 에러는 centralized error에서 처리됨
router.post('/issue', Ctrl.Response.post,
                      Ctrl.Auth.verify,
                      Ctrl.UserToken.search,
                      upload.single('file'),
                      Ctrl.File.scan,
                      Ctrl.Issue.search);

module.exports = router;