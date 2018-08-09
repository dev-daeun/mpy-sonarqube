const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();



/**
 * @api {POST} /user 신규사용자 등록
 * @apiDescription 쇼핑몰서비스에 회원가입 시 요청합니다.
 * @apiName registering new user
 * @apiGroup User
 *
 * @apiParam (Request body) {String} username 사용자 아이디(unique)
 * @apiParam (Request body) {String} email 사용자 이메일(unique)
 * @apiParam (Request body) {String} password 사용자 비밀번호
 * @apiExample Example usage:
 *     endpoint: http://localhost:6260/user
 *     body:
 *     {
 *       "username": "kde6260",
 *       "email": "kde6260@gmail.com",
 *       "password": 1234
 *     }
 *
 * @apiSuccess (201) Created 사용자 가입성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created"
 *     }
 * @apiError (400) UsernameAlreadyExists 이미 존재하는 아이디
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 UserAlreadyExists
 *     {
 *       "message": "UsernameAlreadyExists"
 *     }
 * @apiError (400) EmailAlreadyExists 이미 존재하는 이메일
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 EmailAlreadyExists
 *     {
 *       "message": "EmailAlreadyExists"
 *     }
 * @apiError (500) InternalServerError 서버에러
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 InternalServerError
 *     {
 *       "message": "InternalServerError"
 *     }
 *
 */
router.post('/user', Ctrl.Response.post,
                     Ctrl.Trans.exec,
                     Ctrl.User.searchByName,
                     Ctrl.User.searchByEmail,
                     Ctrl.User.create,
                     Ctrl.Organization.create,
                     Ctrl.OrgUser.create,
                     Ctrl.UserToken.create
);


/**
 * @api {POST} /sign jwt발급
 * @apiDescription 쇼핑몰 서비스에 로그인 시 요청합니다.
 * @apiName assigning jwt
 * @apiGroup User
 *
 * @apiParam (Request body) {String} username 사용자 아이디(unique)
 * @apiParam (Request body) {String} password 사용자 비밀번호
 * @apiExample Example usage:
 *     endpoint: http://localhost:6260/sign
 *     body:
 *     {
 *       "username": "kde6260",
 *       "password": 1234
 *     }
 *
 * @apiSuccess (201) Created jwt발급 성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created"
 *       "token": "sweofskdjfao390823nn3w9cvxn==2349sjfsks..."
 *     }
 * @apiError (401) AuthenticationFailed 아이디 또는 비밀번호 오류
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 AuthenticationFailed
 *     {
 *       "message": "AuthenticationFailed"
 *     }
 * @apiError (500) InternalServerError 서버에러
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 InternalServerError
 *     {
 *       "message": "InternalServerError"
 *     }
 *
 */
router.post('/sign', Ctrl.Response.post, Ctrl.Auth.sign);

module.exports = router;