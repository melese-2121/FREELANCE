const { DataTypes } = require('sequelize');

// Require DB connection module
const sequelize = require('../connection/db');

module.exports = sequelize.define('jobs', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
        allowNull: false,
        default: 'unknown'
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    initial:{
        type: DataTypes.DATE,
        allowNull: false
    },
    final:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
})