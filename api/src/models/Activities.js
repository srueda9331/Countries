const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true    
    },
    name: {
      type: DataTypes.STRING
    },
    difficulty:{ 
      type : DataTypes.STRING    
    },
    length: {
      type: DataTypes.STRING    
    },
    season: {
      type: DataTypes.STRING,
    },
    createdAtDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, 
  {
    timestamps: false
  });
};