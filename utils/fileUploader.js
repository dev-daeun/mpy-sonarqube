const crypto = require("./crypto");
const multer = require('koa-multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(__dirname, '..', '/files/'));
        },
        filename: async function(req, file, cb) {
            cb(null, await crypto.getRandomString(16) + Date.now() + '-' + file.originalname);
        }
    })

});
module.exports = upload;