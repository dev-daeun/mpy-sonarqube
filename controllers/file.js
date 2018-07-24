const sonar = require('../utils/sonarScan');
const path = require('path');



async function scan(ctx, next){
   try{

    let zippedFile = ctx.req.file.filename,
        unzippedFile = ctx.req.file.originalname.split('.')[0],
        filePath = path.join(__dirname, '..', '/files/'),
        login = ctx.state.sonartoken;

    console.log("login : ", login)
    await sonar.scan(zippedFile, unzippedFile, filePath, login);
    await next();

   }catch(err){
       ctx.throw(500, new Error('SonarScanError:' +err.message));
   }
}


module.exports = {
    scan
};




