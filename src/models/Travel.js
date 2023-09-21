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
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    hotel: {
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
    ingreso: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    salida: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    pension: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    cronograma: {
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
    contratos: {
      type:DataTypes.STRING,
      allowNull:true,
    }
  })

  };