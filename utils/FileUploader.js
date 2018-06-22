const crypto = require("crypto");
const multer = require('koa-multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(__dirname, '..', '/files/'));
        },
        filename: function(req, file, cb) {
            crypto.pseudoRandomBytes(16, function(err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname);
            });
        }
    })

});
module.exports = upload;