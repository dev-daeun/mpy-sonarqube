const Router = require('koa-router');
const router = new Router();
const multer = require('koa-multer');
const upload = multer({
    dest: '../mpy-projects/'
});


//upload 에러는 centralized error에서 처리됨
router.post('/project', upload.single('file'), async (ctx, next)=>{
   try{
       //파일업로드 & 소나스캔 처리하는 미들웨어
       next();
   }catch(err){
       ctx.throw(500, new Error('sonar scan error'));
   }
});

router.use(async(ctx, next)=>{
    //postgreSQL에서 스캔결과 가져오고 응답하는 미들웨어
    try{

    }catch(err){
        ctx.throw(500, new Error('select result error'));
    }
});



module.exports = router;



