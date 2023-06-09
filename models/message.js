'use strict';

const { v4 } = require("uuid");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    system: DataTypes.BOOLEAN,
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
    hooks: {
        beforeCreate: (message, options) => {
            message.uuid = v4();
        }
    }
  });
  return Message;
};