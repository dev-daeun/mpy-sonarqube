const crypto = require('crypto');

function getRandomString(length){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length/2), (err, buf) => {
            if(err)
                reject(err);
            else
                resolve(buf.toString('hex').slice(0, buf.length));
        });
    });
}

async function hashData(rawData){
    try{
        let salt = await getRandomString(32);
        let hash = crypto.createHmac('sha256', salt);
        hash.update(rawData);
        let hashedData = hash.digest('hex');
        return {
            salt: salt,
            hashedData: hashedData
        };
    }catch(err){
        throw err;
    }
}


module.exports = {
    getRandomString,
    hashData
};