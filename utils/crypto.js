const crypto = require('crypto');
const verify = crypto.createVerify('sha256');

function getRandomString(length){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length), (err, buf) => {
            if(err)
                reject(err);
            else
                resolve(buf.toString('hex').slice(0, buf.length));
        });
    });
}

async function hashDataWithSalt(rawData, salt){
    try{
        let hash = crypto.createHmac('sha256', salt);
        hash.update(rawData);
        let hashedData = hash.digest('hex');
        return hashedData;

    }catch(err){
        throw err;
    }
}

function hashData(rawData){
        let hash = crypto.createHash('sha384');
        hash.update(rawData);
        let hashedData = hash.digest('hex');
        return hashedData;

}

async function verifyData(raw, hashed, salt){
    let hashedRaw = await hashDataWithSalt(raw, salt);
    if(hashedRaw!==hashed) return false;
    return true;
}


module.exports = {
    getRandomString,
    hashData,
    hashDataWithSalt,
    verifyData
};