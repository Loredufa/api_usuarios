const { Fee } = require('../models/index')
const config = require('../utils/config')

//obtener todos las cuotas
const getAllFees = async (req, res) => {
  try {
    const cuotas = await Fee.findAll()
    res.send(JSON.stringify(cuotas))
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Dar de alta un nueva cuota +SOLO PARA PRUEBAS DE MANERA LOCAL+
const addCuota = async (req,res) => {
    try {
      const cuota = req.body
      const newCuota = await Fee.create(cuota)

      newCuota? res.status(200).send({message :'Cuota creada', newCuota}) :
      res.status(404).send({message: `No se pudo crear la cuota`})

    } catch (error) { console.log("Algo salio mal: ", error); 
    res.status(500).send({ message: 'Error interno del servidor' });
  }
  }


//Obtener cuota por id
const getFeeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cuota = await Fee.findByPk(id);

    if (!cuota) {
      res.status(401).send({ message: `No se pudo encontrar la cuota` });
    } else {
        res.status(200).send(cuota);
    }
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};


//Obtener todas las cuotas de un pasajero 
const getCuotaByPessenger = async (req, res, next) => {
  try {
    const num = req.params.num;
    const num_pass = req.params.num_pass;
    const cuotas = await Fee.findAll({
      where: {
        contrato_cuyen: num,
        numPass: num_pass,
      },
    });

    if (!cuotas || cuotas.length === 0) {
      return res.status(404).send({ mensaje: "Aun no hay cuotas para mostrar" });
    }

    const hoy = new Date();
    const cuotaVencida = cuotas.some(cuota => cuota.pagada === "0" || cuota.pagada === "" && new Date(cuota.vencimiento) < hoy);
    const cuotaActual = cuotas.find(cuota => cuota.pagada === "0" || cuota.pagada === "" && new Date(cuota.vencimiento).getMonth() === hoy.getMonth());

    if (cuotaVencida) {
      return res.status(200).send([{ en_mora: true }]);
    }

    if (cuotaActual) {
      return res.status(200).send([cuotaActual]);
    }

    const siguienteCuota = cuotas.filter(cuota => cuota.pagada === "0" || cuota.pagada === "")
    .sort((a, b) => new Date(a.vencimiento) - new Date(b.vencimiento))[0];

    res.status(200).send([siguienteCuota]);
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

//Obtener todas las cuotas de un pasajero 
const getCuotaByTest = async (req, res, next) => {
  try {
    const num = req.params.num;
    const num_pass = req.params.num_pass;
    const cuotas = await Fee.findAll({
      where: {
        contrato_cuyen: num,
        numPass: num_pass
      }
    });
    if (!cuotas || cuotas.length === 0) {
      return res.status(404).send({ mensaje: "Aun no hay cuotas para mostrar" });
    } else {
      res.status(200).send(cuotas);
    }
    
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};


//Obtener el estado de todas las cuotas de un pasajero 
const getStatusCuota = async (req, res, next) => {
    try {
        const num = req.params.num;
        const num_pass = req.params.num_pass;
        const cuotas = await Fee.findAll({
            where: {
                contrato_cuyen: num,
                numPass: num_pass
            }
        });
        if (!cuotas || cuotas.length === 0) {
            res.status(404).send({ mensaje: "Aun no hay cuotas para mostrar" });
        } else {
            const cuotas_pagas = cuotas.reduce((acumulador, cuota) => {
                if (cuota.pagada === "1" || cuota.pagada === 1) {
                    return acumulador + 1;
                }
                return acumulador;
            }, 0);

            const cuotas_impagas = cuotas.reduce((acumulador, cuota) => {
                if (cuota.pagada === "0" || cuota.pagada === "" || cuota.pagada === 0) {
                    return acumulador + 1;
                }
                return acumulador;
            }, 0);

            const cuotasVencidas = cuotas.filter(cuota => cuota.pagada === "0" || cuota.pagada === "" && new Date(cuota.vencimiento) < new Date());
            const cuotas_vencidas = cuotasVencidas.length;  

            const monto_pend_pago = cuotas.reduce((sumatoria, cuota) => {
                if (cuota.pagada === "0" || cuota.pagada === "") { 
                    return sumatoria += parseFloat(cuota.importe);
                }
                return sumatoria;
            }, 0);
            const monto_cuota = parseFloat(cuotas[0].importe);
            const cant_cuotas = cuotas.reduce((acumulador, cuota) => {
                return acumulador +1 ;
            }, 0);

            const total_contrato = monto_cuota * cant_cuotas         

            const resultados = { "Cuotas pagas": cuotas_pagas, "Cuotas impagas": cuotas_impagas, "Cuotas vencidas": cuotas_vencidas, "Monto pendiente": monto_pend_pago,
            "Monto cuota": monto_cuota, "Cantidad cuotas": cant_cuotas, "Total contrato": total_contrato
        };

            res.status(200).send(resultados);
        }

    } catch (error) {
        console.log("Algo salió mal: ", error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
};

//Modificar cuota
const putCuota = async (req, res) => {
  try {
    const id = req.params.id;
    const cuota = req.body;   

    const updateCuota = await Fee.update(cuota, {
      where: {
        id,
      },
    })
    updateCuota[0] !== 0? res.status(200).send({updateCuota, message:"Cuota actualizada"}) : 
    res.status(400).send({message:"No se pudo actualizar la cuota"})
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Eliminar una cuota
const deleteCuota = async(req, res) => {
  try {
    const id = req.params.id
    const deleteCuota = await Fee.destroy({
      where: {
        id,
      },
    })
    deleteCuota? res.status(200).send({message: 'Cuota eliminada'}) :
    res.status(401).send({message: 'No se pudo eliminar la cuota'})

  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

module.exports = {
    getAllFees,
    getFeeById,
    getCuotaByPessenger,
    putCuota,
    deleteCuota,
    getStatusCuota,
    addCuota,
    getCuotaByTest
}