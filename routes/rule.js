const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();


/**
 * @api {POST} /rule 커스텀 룰 등록
 * @apiDescription profile 생성 후에 요청합니다.
 * @apiName creating customized rule
 * @apiGroup Rule
 *
 * @apiParam (Request body) {String} projectUid 프로젝트 스캔API에서 받은 projectUid
 * @apiParam (Request body) {String} name 룰 이름
 * @apiParam (Request body) {String} description 룰에 대한 설명
 * @apiParam (Request body) {Number} severity 룰을 위반했을 때 위험도(101=INFO, 102=MINOR, 103=MAJOR, 104=CRITICAL, 105=BLOCKER 중 1개)
 * @apiParam (Request body) {String} language 언어 (py, java, js 중 하나만 가능합니다.)
 * @apiParam (Request body) {Number} type 룰이 검사하려는 목적(1=code smell, 2=vulnerability, 3=bug)
 * @apiParam (Request body) {Object[]} parameters 룰 등록에 필요한 파라미터
 * (language마다 다름, 배열 내 각 json의 name프로퍼티는 언어마다 고정되어 있습니다. [여기](https://github.com/formaker/mpy-sonarqube/wiki/customized-rule-%EB%93%B1%EB%A1%9D%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%96%B8%EC%96%B4%EC%99%80-%EB%A3%B0%EC%9D%98-%EC%A2%85%EB%A5%98)와 아래의 example을 참고하세요.)
 * @apiParamExample {array} py's parameters example:
 *     [{
 *         "name": "xpathQuery",
 *         "value": "//IDENTIFIER[string-length(@tokenValue)<6]"
 *       },
 *      {
 *         "name": "message",
 *         "value": "var's length must be longer than 6"
 *     }]
 * @apiParamExample {array} java's parameters example:
 *     [{
 *         "name": "toClasses",
 *         "value": "*.view.*"
 *       },
 *      {
 *         "name": "fromClasses",
 *          "value": "*.dao.*"
 *     }]
 * @apiParamExample {array} js's parameters example:
 *     [{
 *         "name": "regularExpression",
 *         "value": "/^([a-zA-Z0-9_-]){3,5}$/"
 *       },
 *      {
 *         "name": "message",
 *          "value": "var's length must be between 3 and 5"
 *     }]
 * @apiExample Example usage:
 *     endpoint: http://localhost:6260/rule
 *     body: {
 *               "name": "new customized rule for testing",
 *               "projectUid": "AWUI8pmzwpiz1CcmvZNg",
 *               "description": "python-beginner 커스텀 룰",
 *               "severity": 103,
 *               "language": "py",
 *               "type": 1,
 *               "parameters": [
 *                   {
 *                       "name": "xpathQuery",
 *                       "value": "//IDENTIFIER[string-length(@tokenValue)<6]"
 *                   },
 *                    {
 *                      "name": "message",
 *                      "value": "var's length must be longer than 6"
 *                   }
 *               ]
 *   }
 *
 *
 * @apiSuccess (201) Created 룰 등록 성공
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Created"
 *     }
 * @apiError (400) ParametersRequired 값들이 들어오지 않았을 때
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 ParametersRequired
 *     {
 *       "message": "ParametersRequired"
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
 * @apiError (500) InternalServerError 서버에러
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 InternalServerError
 *     {
 *       "message": "InternalServerError"
 *     }
 *
 */

async function checkParams(ctx, next){

    for(let p in Object.values(ctx.request.body)){
        if(Object.values(ctx.request.body)[p] == null || Object.values(ctx.request.body)[p] === "") {
            ctx.throw(400, new Error('ParametersRequired'));
        }
    }

    for(let p in ctx.request.body.parameters) {
        if(Object.values(ctx.request.body)[p] == null || Object.values(ctx.request.body)[p] === "") {
            ctx.throw(400, new Error('ParametersRequired'));
        }
    }

    await next();
}
router.post('/rule',
        Ctrl.Response.post,
        checkParams,
        Ctrl.Auth.verify,
        Ctrl.Project.searchByUid,
        Ctrl.Rule.create,
        Ctrl.RuleProfile.create,
        Ctrl.ProjectProfile.create
);

module.exports = router;