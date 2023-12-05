const { Passenger } = require('../models/index')

//obtener todos los pasajeros
const getAllPasajeros = async (req, res) => {
  try {
    const pasajero = await Passenger.findAll()
    res.send(JSON.stringify(pasajero))
  } catch (error) { console.log("Algo salio mal: ", error); 
}
}

//obtener todos los pasajeros por numero de contrato
const getAllbyContract = async (req, res) => {
    try {
      const contrato = req.params.num; 
      const pasajeros = await Passenger.findAll({
        where: {
          contratos: contrato,
        }
      });  
      if (pasajeros.length > 0) {
        res.status(200).send(JSON.stringify(pasajeros));
      } else {
        res.status(404).send({ message: 'Contrato no encontrado' });
      }
    } catch (error) {
      console.log("Algo salió mal: ", error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  };
  

//Dar de alta un nuevo pasajero
const addPasajero = async (req,res) => { 
  try {
    const pasajero = req.body  //{dni: 123, contrato: xxx}
    const newPasajero = await Passenger.create(pasajero)
    newPasajero? res.status(200).send(newPasajero) :  res.status(404).send({message: `No se pudo crear el pasajero`})
  } catch (error) { console.log("Algo salio mal: ", error); 
}
}

//Modificar datos del pasajero
const putPessenger = async (req, res) => {
  try {
    const newData = req.body;
    const id = req.params.id;   
    const updateData = await Passenger.update(newData, {
      where: {
        id,
      },
    })
    updateData[0] !== 0? res.status(200).send({message:"Pasajero actualizado"}) : 
    res.status(400).send({message:"No se pudo actualizar el pasajero"})
  } catch (error) { console.log("Algo salio mal: ", error);   
}}

module.exports = {
    getAllbyContract,
    addPasajero,
    putPessenger,
    getAllPasajeros
}