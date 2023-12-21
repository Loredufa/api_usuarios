const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient({
  url: 'redis://default:Cuyen$2023@24.199.111.189:6379'
});

redisClient.on('error', (error) => console.error(`Error en Redis Client: ${error}`));

// Promisifying Redis rpush function
const rpushAsync = promisify(redisClient.rpush).bind(redisClient);

// No es necesario el método connect ni quitAsync

module.exports = {
  redisClient,
  rpushAsync,
};
