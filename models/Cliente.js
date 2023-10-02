const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('cliente', {
    nome:{
        type: DataTypes.STRING(50)
    },
    idade:{
        type: DataTypes.INTEGER
    }
},{
    createdAt:false,
    updatedAt:false
})

// Cliente.sync({force:true})
module.exports = Cliente