const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const fs = require('fs');

function sign(data){
    return new Promise((resolve, reject) => {

        var claim = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
            data: data
        };
        var algorithm = {
            algorithm: authConfig.algorithm
        };

        fs.readFile(authConfig.privateKey, (err, key) => {
            if (err) reject(err);
            jwt.sign(claim, key, algorithm, (err, token) => {
                if(err) reject(err);
                resolve(token);
            });
        });
    });

}

function verify(token){
    return new Promise((resolve, reject) => {
        fs.readFile(authConfig.publicKey, (err, key) => {
            if(err) reject(err);
            jwt.verify(token, key, (err, decoded) => {
                if(err) resolve(['external', err]);
                else if(!decoded) resolve(['external', err]);
                else resolve([null, decoded.data]);
            });
        });
    });

}

module.exports = {
    sign,
    verify
};