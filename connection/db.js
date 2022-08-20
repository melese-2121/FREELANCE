const Sequelize = require('sequelize');
const sequelize = new Sequelize('freelance_db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

sequelize.authenticate()
         .then(() => {
            console.log("CONNECTED!");
         })
         .catch(err => {
            console.log("Error: ", err)
         })


module.exports = sequelize;