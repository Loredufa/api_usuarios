process.env.TZ = 'UTC';
const { Passenger, Contract, Login} = require('../models/index')
const { addMonths, differenceInMonths, format, parse } = require('date-fns');

//obtener todos los pasajeros
const getAllPasajeros = async (req, res) => {
  try {
    const pasajero = await Passenger.findAll()
    res.send(JSON.stringify(pasajero))
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//obtener todos los pasajeros por numero de contrato
const getAllbyContract = async (req, res) => {
    try {
      const contrato = req.params.num; 
      const pasajeros = await Passenger.findAll({
        where: {
          contratos: contrato,
        },
        order: [['apellido', 'ASC']]
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
  res.status(500).send({ message: 'Error interno del servidor' });
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
  } catch (error) { res.status(500).send({ message: 'Error interno del servidor' });  
}}

//Verifica si existe el usuario o el pasajero y retorna la informacion para autocompletado de la app
const verifyPessegerToApp = async (req, res) => {
  try {
    const dni = req.params.dni;
    const num = req.params.num;
    let pasajero = {};

    const login = await Login.findOne({
      where: {
        usuario: dni,
      },
    });
    const pessenger = await Passenger.findOne({
      where: {
        dni,
      },
    });
    const infoContract = await Contract.findOne({
      where: {
        num,
      },
    });
    const nombreMes = infoContract.mes;
    const año = infoContract.año;

    // Función para mapear el nombre del mes a su número correspondiente
    const obtenerNumeroDeMes = (nombreMes) => {
      const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
      ];
      return meses.indexOf(nombreMes.toUpperCase()) + 1;
    };

    // Obtener el número del mes
    const numeroMes = obtenerNumeroDeMes(nombreMes);
    console.log('Número del mes:', numeroMes);

    // Construir la fecha
    const fechaLimite = addMonths(new Date(año, numeroMes - 1, 1), -1);
    console.log('Fecha construida:', fechaLimite);
    console.log('Fecha límite de pago:', format(fechaLimite, 'MMMM yyyy'));
    // Calcula la diferencia en meses entre la fecha límite y hoy
    const mesesRestantes = differenceInMonths(fechaLimite, new Date());
    // Frecuencia de las cuotas disponibles
    const frecuenciaCuotas = [1, 3, 6, 9, 12, 18];
    // Filtra las cuotas que el usuario puede elegir
    let cuotasDisponibles = frecuenciaCuotas.filter(cuota => cuota <= mesesRestantes);
    console.log('Fecha límite de pago:', format(fechaLimite, 'MMMM yyyy'));

    // Si la diferencia en meses es menor a 3, permite la opción de 1 cuota
    if (mesesRestantes < 3 && !cuotasDisponibles.includes(1)) {
      cuotasDisponibles.push(1);
    }

    if (login && pessenger) {
      pasajero = {
        nombre: login.nombre,
        apellido: login.apellido,
        dni: login.dni,
        fechaNac: pessenger.fechaNac,
        importe: infoContract.importe,
        cuotas: cuotasDisponibles,
        login: true,
      };
    } else if (login && !pessenger) {
      pasajero = {
        nombre: login.nombre,
        apellido: login.apellido,
        dni: login.dni,
        importe: infoContract.importe,
        cuotas: cuotasDisponibles,
        login: true,
      };
    } else if (!login && pessenger) {
      pasajero = {
        nombre: pessenger.nombre,
        apellido: pessenger.apellido,
        dni: pessenger.dni,
        fechaNac: pessenger.fechaNac,
        importe: infoContract.importe,
        cuotas: cuotasDisponibles,
        login: false,
      };
    }

    if (Object.keys(pasajero).length > 0) {
      res.status(200).send(pasajero);
    } else {
      res.status(400).send({ message: 'No existen datos', cuotas: cuotasDisponibles });
    }
  } catch (error) {
    console.log('Algo salió mal: ', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

//Eliminar un pasajero
const deleteUsuario = async(req, res) => {
  try {
    const id = req.params.id
    const deleteUser = await Login.destroy({
      where: {
        id,
      },
    })
    deleteUser? res.status(200).send({message: 'Usuario eliminado'}) :
    res.status(401).send({message: 'No se pudo eliminar el usuario'})

  } catch (error) { 
    console.log("Algo salio mal: ", error); 
    res.status(500).send({ message: 'Error interno del servidor' });
}
}
const addPasajeroToApp = async (req, res) => {
try {
  const { dni, nombre, apellido, fechaNac, importe, cuotas, contrato, padreId } = req.body;
} catch (error) { 
  console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}


module.exports = {
    getAllbyContract,
    addPasajero,
    putPessenger,
    getAllPasajeros,
    verifyPessegerToApp,
    deleteUsuario
}