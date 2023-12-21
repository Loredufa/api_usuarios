const { redisClient } = require('../utils/redisClient');

const addRedis = async (req, res, newPasajero) => {
  try {

    // Obtener el ID del pasajero recién creado
    const pasajeroId = newPasajero.id;

    // Construir la key para la lista en Redis
    const redisKey = 'pasajeros';

    // Agregar el ID del pasajero a la lista en Redis
    await redisClient.rpush(redisKey, pasajeroId);

    // Puedes almacenar más detalles del pasajero usando otra clave única, por ejemplo:
    const detallesPasajeroKey = `pasajero:${pasajeroId}`;
    await redisClient.set(detallesPasajeroKey, JSON.stringify(newPasajero));

    res.status(200).send(newPasajero);
  } catch (error) {
    console.log('Algo salió mal: ', error);
    return { message: 'Algo salió mal durante la sincronización' };
  }
};

module.exports = {
  addRedis,
};
