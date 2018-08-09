const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();



/**
 * @api {POST} /user 사용자 등록요청(쇼핑몰서비스에 회원가입 시 요청합니다.)
 * @apiName post user
 * @apiGroup User
 *
 * @apiParam {String} username 사용자 아이디(unique)
 * @apiParam {String} email 사용자 이메일(unique)
 * @apiParam {String} password 사용자 비밀번호
 *
 * @apiSuccess (201) Created 사용자 가입성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created"
 *     }
 *
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
 *
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

router.post('/login', Ctrl.Response.post, Ctrl.Auth.sign);

module.exports = router;