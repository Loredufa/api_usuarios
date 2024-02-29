const { School } = require('../models/index');
const colegios = require('../libs/colegios.json')

const createColegios = async () => {
    try {
      const existingColegios = await School.findAll(); 
      if (existingColegios.length > 0) {
       return console.log('Los colegios ya estan creados');
      } else {
        const newColegios = await Promise.all(
            colegios.map((e) => School.create(e))
        );
  
        if (newColegios.length > 0) {
          return console.log('Colegios creados')
        } else {
          return console.log('No se pudieron crear los colegios')
        }
      }
    } catch (error) {
      console.log("Algo salió mal: ", error);
    }
  }
  
  module.exports = {
    createColegios
  }
  