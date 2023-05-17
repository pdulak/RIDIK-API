const { sequelize, Message } = require('../models');
const { QueryTypes } = require('sequelize');

function Dao() {

    const checkConnection = async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }

    return {
        checkConnection,
        sequelize,
        QueryTypes,
        Message,
    }
}

module.exports = {
    dao: Dao(),
}