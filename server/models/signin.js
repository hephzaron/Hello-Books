'use strict';
module.exports = function(sequelize, DataTypes) {
  var SignIn = sequelize.define('SignIn', {
    user_id: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SignIn;
};