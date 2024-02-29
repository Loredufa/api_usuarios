const { School, Contract } = require('../models/index')

//obtener todos los colegios
const getAllSchools = async (req, res) => {
    try {
      // Obtener todos los colegios de la tabla School
      const escuelas = await School.findAll();
      // Buscar todos los contratos
      const bdSchools = await Contract.findAll();
      // Extrae solo la propiedad 'colegio' de cada elemento
      const bdcolegios = bdSchools.map(contract => contract.colegio);
      // Elimina duplicados
      const colegiosUnicos = [...new Set(bdcolegios)];
      console.log('COLEGIOUNICOS', colegiosUnicos)
      // Verifica si cada colegio único existe en el array original
      // Verifica si cada colegio único existe en el array original
    for (const colegioUnico of colegiosUnicos) {
        if (!escuelas.find(colegio => colegio.nombre === colegioUnico)) {
          console.log('COLEGIOUNICO', colegioUnico);
  
          // Si el colegio único no existe en el array original, lo crea
          const create = await School.create({
            nombre: colegioUnico,
          });
          console.log('CREATE', create);
        }
      }
      // Lista completa de la tabla School después de la creación
      const listaCompleta = await School.findAll(); 
      res.send(JSON.stringify(listaCompleta));
    } catch (error) {
      console.log("Algo salió mal: ", error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  };

  module.exports = {
    getAllSchools
}
