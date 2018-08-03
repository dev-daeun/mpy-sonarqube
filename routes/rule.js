const Ctrl = require('../controllers/ctrlFile');
const Router = require('koa-router');
const router = new Router();



router.post('/rule',
        Ctrl.Response.post,
        Ctrl.Auth.verify,
        Ctrl.Rule.create,
        Ctrl.RuleProfile.create,
        Ctrl.ProjectProfile.create
);

module.exports = router;