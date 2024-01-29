process.env.TZ = 'UTC';
const { Sequelize, sequelize, Passenger, Contract, Login} = require('../models/index')
const { addMonths, differenceInMonths, format } = require('date-fns');
const { conectionMail } = require('./RecupPassApp');
const { addRedis } = require('./addRedis');
const { redisClient } = require('../utils/redisClient');

//Obtiene los pasajeros que estan relacionados a un usuario por idLogin

const getRelationByIdLogin = async (req, res) => {
  try{
const loginId = req.params.loginId;
// Busca el login con el ID proporcionado
const loginInstance = await Login.findByPk(loginId);
if (!loginInstance) {
  res.status(400).send({ message: "No se encontró el usuario. " })
} else {
// Obtén la relación entre Login y Passenger
const passengers = await loginInstance.getPassengers();
res.status(200).send(JSON.stringify(passengers))
}
} catch (error) { console.log("Algo salio mal: ", error); 
res.status(500).send({ message: 'Error interno del servidor' });
}
}

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
const addPasajero = async (req, res) => {
  try {
    const pasajero = req.body;
    const login = req.body.login;

    let newPasajero;
    const verifyPasajero = await Passenger.findOne({
      where: { dni: pasajero.dni, contratos: pasajero.contrato },
    });

    if (verifyPasajero) {
      res.status(403).send({ message: "El pasajero ya existe para ese contrato" });
    } else if (login) {
      const actLogin = await Login.findOne({ where: { usuario: pasajero.dni } });

      if (!actLogin) {
        res.status(401).send({ message: "Usuario no encontrado" });
        return;
      }

      // Actualizar el contrato en el login existente
      const updatedLogin = await actLogin.update({
        contrato: [...actLogin.contrato, ...pasajero.contrato],
      });

      const contratosString = pasajero.contrato.join(', ');

      // Llama a la función para calcular el número de pasajero
      const numPas = await calcularNumPasajero(contratosString);

      // Crear pasajero
      newPasajero = await Passenger.create({
        nombre: pasajero.nombre,
        dni: pasajero.dni,
        apellido: pasajero.apellido,
        correo: pasajero.email,
        contratos: contratosString,
        fechaNac: pasajero.fechaNac,
        importe: pasajero.importe,
        cuotas: pasajero.cuotas,
        numPas: numPas,
      });

      if (!newPasajero) {
        res.status(402).send({ message: "No se pudo crear el Pasajero" });
        return;
      }
      specifiedLogin = await Login.findByPk(pasajero.loginId);
      if (!specifiedLogin) {
        res.status(404).send({ message: "El login especificado no fue encontrado" });
        return;
      }
      // Asocia el nuevo pasajero al login especificado
      await specifiedLogin.addPassenger(newPasajero)
      // Obtener el ID del pasajero recién creado
      const pasajeroId = newPasajero.id;

      // Construir la key para la lista en Redis
      const redisKey = 'pasajeros';

      // Agregar el ID del pasajero a la lista en Redis
      await redisClient.rpush(redisKey, pasajeroId);

      // Puedes almacenar más detalles del pasajero usando otra clave única, por ejemplo:
      const detallesPasajeroKey = `pasajero:${pasajeroId}`;
      const infoPasajero = await redisClient.set(detallesPasajeroKey, JSON.stringify(newPasajero));

      console.log('SOY INFO PASAJEROS', infoPasajero)

      if (!infoPasajero) {
      res.status(408).send({ message: "No se pudieron enviar los datos a Redis" });
      return;
    }

    } else {
      // Crear un nuevo login y asociar el pasajero
      const newLogin = await Login.create({
        nombre: pasajero.nombre,
        apellido: pasajero.apellido,
        password: pasajero.dni,
        usuario: pasajero.dni,
        email: pasajero.email,
        rol: "Pasajero",
        contrato: pasajero.contrato,
        estado: true,
      });

      usuario = newLogin;

      // Envía el correo electrónico
      const mail = await conectionMail(req, res, usuario);

      // Calcula el número de pasajero
      const numPas = await calcularNumPasajero(pasajero.contrato);

      // Crea el nuevo pasajero asociado al nuevo login
      newPasajero = await Passenger.create({
        ...pasajero,
        numPas: numPas,
        contratos: pasajero.contrato.join(', '),
        correo: pasajero.email
      });

      if (!newPasajero) {
        res.status(406).send({ message: "No se pudo crear el Pasajero" });
        return;
      }

      specifiedLogin = await Login.findByPk(pasajero.loginId);
      if (!specifiedLogin) {
        res.status(407).send({ message: "El login especificado no fue encontrado" });
        return;
      }
      // Asocia el nuevo pasajero al login especificado
      await specifiedLogin.addPassenger(newPasajero);
    }
     // Obtener el ID del pasajero recién creado
     const pasajeroId = newPasajero.id;

     // Construir la key para la lista en Redis
     const redisKey = 'pasajeros';
 
     // Agregar el ID del pasajero a la lista en Redis
     await redisClient.rpush(redisKey, pasajeroId);
 
     // Puedes almacenar más detalles del pasajero usando otra clave única, por ejemplo:
     const detallesPasajeroKey = `pasajero:${pasajeroId}`;
     const infoPasajero = await redisClient.set(detallesPasajeroKey, JSON.stringify(newPasajero));
 
      console.log('SOY INFO PASAJEROS', infoPasajero)

      if (!infoPasajero) {
        res.status(408).send({ message: "No se pudieron enviar los datos a Redis" });
        return;
      }

    res.status(200).send(newPasajero);
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

// Función para calcular el número de pasajero

const calcularNumPasajero = async (contrato) => {
  // Encuentra la cantidad de pasajeros para el contrato dado
  const cantidadPasajeros = await Passenger.count({
    where: { contratos: contrato, numPas: { [Sequelize.Op.not]: null } },
  });
   // El número de pasajero será la cantidad actual + 1
   const numPasajero = cantidadPasajeros + 1;
   return numPasajero;
 };


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
    const nombreMes = infoContract.mes.trim();
    const año = infoContract.año.trim();
   
    console.log('SOY NOMBRE MES', nombreMes)
    console.log('SOY EL AÑO', año)

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
    console.log('SOY LOS MESES RESTANTES', mesesRestantes)
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
        email: login.email,
        login: true,
      };
    } else if (login && !pessenger) {
      pasajero = {
        nombre: login.nombre,
        apellido: login.apellido,
        dni: login.dni,
        importe: infoContract.importe,
        cuotas: cuotasDisponibles,
        email: login.email,
        login: true,
      };
    } else if (!login && pessenger) {
      pasajero = {
        nombre: pessenger.nombre,
        apellido: pessenger.apellido,
        dni: pessenger.dni,
        email: pessenger.correo,
        fechaNac: pessenger.fechaNac,
        importe: infoContract.importe,
        cuotas: cuotasDisponibles,
        login: "",
      };
    }

    if (Object.keys(pasajero).length > 0) {
      res.status(200).send(pasajero);
    } else {
      res.status(400).send({ message: 'No existen datos', cuotas: cuotasDisponibles, login: "" });
    }
  } catch (error) {
    console.log('Algo salió mal: ', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

//Eliminar un pasajero
const deletePasajero = async(req, res) => {
  try {
    const id = req.params.id
    const deletePassenger = await Passenger.destroy({
      where: {
        id,
      },
    })
    deletePassenger? res.status(200).send({message: 'Pasajero eliminado'}) :
    res.status(401).send({message: 'No se pudo eliminar el pasajero'})

  } catch (error) { 
    console.log("Algo salio mal: ", error); 
    res.status(500).send({ message: 'Error interno del servidor' });
}
}


const addPasajeroToApp = async (req, res) => {
try {
  const { dni, nombre, apellido, fechaNac, importe, cuotas, contrato, padreId, email } = req.body;
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
    deletePasajero,
    getRelationByIdLogin
}