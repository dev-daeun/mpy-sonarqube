const sonar = require('../utils/sonarScan');
const path = require('path');


//파일업로드 & 소나스캔 처리
async function scan(ctx, next){
   try{

    let zippedFile = ctx.req.file.filename,
        unzippedFile = ctx.req.file.originalname.split('.')[0],
        filePath = path.join(__dirname, '..', '/files/'),
        login = '';

    await sonar.scan(zippedFile, unzippedFile, filePath, login);
    await next();

   }catch(err){
       ctx.throw(500, new Error('SonarScanError:' +err.message));
   }
}


module.exports = {
    scan
};




