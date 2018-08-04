const redisConfig = require('../configs/redis');
const bluebird = require('bluebird');
const redis = require("redis"),
      client = redis.createClient(redisConfig.db);

client.on("error", function (err) {
    console.log("RedisError " + err);

});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;