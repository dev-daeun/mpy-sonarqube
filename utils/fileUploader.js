const crypto = require("./crypto");
const multer = require('koa-multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(__dirname, '..', '/files/'));
        },
        filename: async function(req, file, cb) {
            cb(null, file.originalname);
        },
        onError: async function(err, next){
            console.log(err.message);
            await next(err);
        }
    })

});
module.exports = upload;