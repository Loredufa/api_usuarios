const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('travel', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Hotel: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    
    ubicHotel: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    fotosHotel: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    videoHotel: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    estadia: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    cronograma: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    menu: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    coordinador: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    inicioViaje: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    ultimaUbic: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    finViaje: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    muro: {
      type:DataTypes.STRING,
      allowNull:true,
    }
  })

  };