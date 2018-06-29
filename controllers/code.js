const $ = require('shelljs');
const path = require('path');



async function responseToPostCode(ctx, next){
    try{

        await next();
        ctx.response.status = 201;
        ctx.response.body = ctx.body;

    }catch(err){
        ctx.throw(500, new Error("ResponseError : "+err.message));
    }
}


//파일업로드 & 소나스캔 처리
async function scanFile(ctx, next){
   try{

    let file = ctx.req.file.filename;
    let fid = ctx.req.file.originalname.split('.')[0];
    let filesPath = path.join(__dirname, '..', '/files/');

    $.cd(filesPath);
    $.exec('tar -xzvf '+file);
    $.touch(filesPath+fid+'/sonar-project.properties');
    $.exec('echo '
        +      '\'sonar.projectKey='+fid+'\n'
        +        'sonar.projectName='+fid+'\n'
        +        'sonar.projectVersion=1.0\n'
        +        'sonar.sources=.\n'
        +        'sonar.java.binaries=./target\n'
        +        '\n'
        +        'sonar.sourceEncoding=UTF-8\n\''
        + '> '
        +  filesPath+fid+'/'
        +  'sonar-project.properties');
    $.cd(filesPath+fid);
    $.exec('sonar-scanner -X');
    $.rm('-rf', filesPath + fid);
    $.rm(filesPath + file);



   }catch(err){
       ctx.throw(500, new Error('SonarScanError :' +err.message));
   }
}


//postgreSQL에서 스캔결과 조회
async function selectResult(ctx){
    try{


    }catch(err){
        ctx.throw(500, new Error('SelectResultError :'+err.message));
    }
}


//postgreSQL에서 스캔결과 조회
async function selectResult(ctx, next){
    try{
        let Issue = db.issue;
        let messages = await Issue.select();
        ctx.body = messages;
        await next();
    }catch(err){
        ctx.throw(500, new Error("SelectResultError :"+err.message));

    }

}



module.exports = {
    responseToPostCode,
    scanFile,
    selectResult
};




