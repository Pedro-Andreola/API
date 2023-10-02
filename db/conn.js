const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('jorge_bd', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Danco de babos conectado!')
// }
// ).catch((error)=>{
//     console.error('Erro na conexão', error)
// })

module.exports = sequelize