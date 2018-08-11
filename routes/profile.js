const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();


/**
 * @api {POST} /profile quality profile 생성
 * @apiDescription 커스텀 룰 등록에 필요한 quality profile을 생성하도록 요청합니다.
 * @apiName creating new quality profile
 * @apiGroup Rule
 *
 * @apiHeader (Request header) {String} authorization jwt발급 API로 받은 토큰
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "sweofskdjfao390823nn3w9cvxn==2349sjfsks..."
 *     }
 * @apiParam (Request body) {String} projectUid 프로젝트 스캔 API에서 받은 projectUid
 * (profile과 커스텀 룰 생성은 프로젝트 스캔 API를 한번 이상 호출해야 요청가능합니다.)
 * @apiParam (Request body) {String} language 프로젝트 언어
 * (py, java, js만 가능합니다.)
 *
 * @apiExample Example usage:
 *     endpoint: http://localhost:6260/profile
 *     body: {
 *         "projectUid": "AWUj0vyggcVA6lzhxT_K",
 *         "language": "py"
 *     }
 *
 *
 * @apiSuccess (201) Created profile 생성 성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created",
 *     }
 *
 * @apiError (400) ParameterRequired 파라미터 값이 들어오지 않았을 때
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 ParameterRequired
 *     {
 *       "message": "ParameterRequired"
 *     }
 * @apiError (401) InvalidToken 유효하지 않은 토큰(토큰이 없거나 깨졌을 때)
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 InvalidToken
 *     {
 *       "message": "InvalidToken"
 *     }
 * @apiError (404) ProjectNotFound 존재하지 않는 ProjectUid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 ProjectNotFound
 *     {
 *       "message": "ProjectNotFound"
 *     }
 * @apiError (405) ProfileAlreadyExists 해당 프로젝트로 등록한 profile이 이미 있을 경우
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 405 ProfileAlreadyExists
 *     {
 *       "message": "ProfileAlreadyExists"
 *     }
 * @apiError (500) InternalServerError 서버에러
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 InternalServerError
 *     {
 *       "message": "InternalServerError"
 *     }
 *
 */
router.post('/profile',
    Ctrl.Response.post,
    Ctrl.Auth.verify,
    Ctrl.QualityProfile.create);

module.exports = router;