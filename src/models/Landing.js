const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = function(sequelize) {
  // defino el modelo
  return sequelize.define('landing', {
    id:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    
    textoImagen: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    video: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    textoVideo: {
      type:DataTypes.STRING,
      allowNull:true,
    }
  })

  };