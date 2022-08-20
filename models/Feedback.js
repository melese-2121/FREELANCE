const { DataTypes } = require('sequelize');

// Require DB connection instance
const sequelize = require('../connection/db.js');

// Create users model
const Feedback = sequelize.define('feedbacks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            emailValidator(value) {
                if(value === ''){
                    throw new Error('Please enter your Email address!')
                }
            }
        }
    },

    body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 1000]
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Feedback;