const { Sequelize, Financing, Contract} = require('../models/index')
const { validacion } = require('./Validacion')
const jwt = require('jsonwebtoken');
const config = require('../utils/config')

//obtener todas las finaciaciones
const getAllFinancing = async (req, res) => {
  try {
    const financ = await Financing.findAll()
    res.send(JSON.stringify(financ))
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Obtener una financiacion por id
const getAllFinancingbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const financ = await Financing.findByPk(id);
    financ? res.status(200).send(JSON.stringify(financ)) : 
    res.status(401).send({ message: `Nose encontró la financiación para el id: ${id}`})
    
  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Dar de alta un nuevo usuario
const addFinancing = async (req,res) => {
  try {
    const financ = req.body
    const newFiananc = await Financing.create(financ)
    newFiananc? res.status(200).send({message: 'Financiación creada', financiación: newFiananc}) :
    res.status(401).send({message: `No se pudo crear la financiación`})
} catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Obtener la financiacion por num contrato
const getFinancingByContract = async (req, res) => {
  try {
    const num = req.params.num;
    const idFinanc = await Contract.findOne({
        where: {
            num: num
        }
    });
    if (!idFinanc) {
      res.status(401).send({ message: `El contrato ${num} no existe` });
    } else {
        if (idFinanc.financingId === null || idFinanc.financingId === '') {
            res.status(402).send({ message: `El contrato ${num} no tiene financiacion agregada` });
        } else {
            const id = idFinanc.financingId
            const financ = await Financing.findByPk(id)
            res.status(200).send(financ);
        }}
  } catch (error) {
    console.log("Algo salió mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

//Modificar la financiacion
const putFinancing = async (req, res) => {
  try {
    const id = req.params.id;
    const financ = req.body;   
    const updateFinanc = await Financing.update(financ, {
      where: {
        id,
      },
    })
    updateFinanc[0] !== 0? res.status(200).send({updateFinanc, message:"Financiacion actualizada"}) : 
    res.status(400).send({message:"No se pudo actualizar la financiación"})

} catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}

//Agregar relacion con el contrato
const putRelacionFinancing = async (req, res) => {
  try {
    const num = req.params.num;
    console.log('SOY NUM', num);
    
    const { financingId } = req.body;  // Extrae financingId del cuerpo de la solicitud
    console.log('SOY BODY', financingId);

    if (!financingId) {
      return res.status(400).send({ message: "financingId es requerido" });
    }

    // Verificar si financingId existe en la tabla financings
    const id = financingId
    const financingExists = await Financing.findByPk(id);
    if (!financingExists) {
      return res.status(404).send({ message: "financingId no existe en la tabla financings" });
    }

    const updateContract = await Contract.update({ financingId }, {
      where: {
        num,
      },
    });

    if (updateContract[0] !== 0) {
      res.status(200).send({ updateContract, message: "Se agregó la financiación al contrato" });
    } else {
      res.status(400).send({ message: "No se pudo agregar la financiación al contrato" });
    }

  } catch (error) {
    console.log("Algo salio mal: ", error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};



//Eliminar la financiacion
const deleteFinancing = async(req, res) => {
  try {
    const id = req.params.id
    const deleteFinanc = await Financing.destroy({
      where: {
        id,
      },
    })
    deleteFinanc? res.status(200).send({message: 'Financiación eliminada'}) :
    res.status(401).send({message: 'No se pudo eliminar la financiacion'})

  } catch (error) { console.log("Algo salio mal: ", error); 
  res.status(500).send({ message: 'Error interno del servidor' });
}
}


module.exports = {
    getAllFinancing,
    getAllFinancingbyId,
    addFinancing,
    getFinancingByContract,
    putFinancing,
    deleteFinancing,
    putRelacionFinancing
}