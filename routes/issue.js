const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();
const upload = require('../utils/fileUploader');


/**
 * @api {POST} /issue 프로젝트 스캔
 * @apiDescription gzip으로 프로젝트를 압축하여 파일로 전송, 스캔서버에서 스캔하도록 요청합니다.
 * @apiName scanning project file with sonarqube
 * @apiGroup Issue
 *
 * @apiHeader (Request header) {String} authorization jwt발급 API로 받은 토큰
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "sweofskdjfao390823nn3w9cvxn==2349sjfsks..."
 *     }
 * @apiParam (Request body) {File} file gzip으로 압축한 프로젝트 파일(multipart/form-data) *한번 압축하여 전송된 파일 이름은 이 API를 재요청할 때 변경되어선 안됩니다.
 * @apiExample Example usage:
 *     endpoint: http://localhost:6260/issue
 *     body: {
 *        "file": python-beginner.tar.gz
 *     }
 *
 *
 * @apiSuccess (201) Created 스캔 성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created",
 *       "projectUid": "AWUI8pmzwpiz1CcmvZNg",
         "issues": [
            {
                "id": "2",
                "line": 6,
                "message": "!!!heheheehehe var length must be longer",
                "severity": "MAJOR"
            },
            {
                "id": "3",
                "line": 6,
                "message": "!!!heheheehehe var length must be longer",
                "severity": "MAJOR"
            }
         ]
 *     }
 * @apiError (401) InvalidToken 유효하지 않은 토큰(토큰이 없거나 깨졌을 때)
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 InvalidToken
 *     {
 *       "message": "InvalidToken"
 *     }
 * @apiError (400) FileRequired 파일이 없거나 올바르지 않은 확장자
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 FileRequired
 *     {
 *       "message": "FileRequired"
 *     }
 * @apiError (500) InternalServerError 서버에러
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 InternalServerError
 *     {
 *       "message": "InternalServerError"
 *     }
 *
 */
router.post('/issue', Ctrl.Response.post,
                      Ctrl.Auth.verify,
                      Ctrl.UserToken.search,
                      upload.single('file'),
                      Ctrl.File.scan,
                      Ctrl.Project.searchByKee);

router.get('/issue', Ctrl.Response.get,
                     Ctrl.Auth.verify,
                     Ctrl.Issue.search);

module.exports = router;