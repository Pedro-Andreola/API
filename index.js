const express = require('express')
const { raw } = require('mysql2')
const { where } = require('sequelize')
const app = express()
const conn = require('./db/conn')
const Cliente = require('./models/Cliente')

const PORT = 3000
const hostname = 'localhost'

/*----------------------------------------------------------------------------------------------*/
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
/*----------------------------------------------------------------------------------------------*/
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-type, Accept' )
    next()
})
/*----------------------------------------------------------------------------------------------*/
app.get('/dados', async (req, res)=>{
    const dados = await Cliente.findAll({raw: true})
    console.log(dados)
    res.status(200).send(dados)
})

app.get('/dados/:id', async (req, res)=>{
    const idCliente = req.params.id
    console.log(idCliente)
    const dados = await Cliente.findOne({raw:true, where:{id:idCliente}})
    console.log(dados)
    res.status(200).send(dados)
})

app.delete('/dados/:id', async (req, res)=>{
    const idCliente = req.params.id
    console.log(idCliente)
    const dados = await Cliente.destroy({where:{id:idCliente}})
    console.log(dados)
    res.status(200).send({message: 'Dados Apagados'})
})

app.put('/dados/:nome', async (req, res)=>{
    const nome = req.params.nome
    const novo_nome = req.body.nome
    const nova_idade = req.body.idade
    console.log(nome)
    const dados = {
        nome: novo_nome,
        idade: nova_idade
    }
    const cliente = await Cliente.findOne({raw: true, where:{nome:nome}})
    console.log(cliente)
    await Cliente.update(dados, {where: {nome:nome}})
    res.status(200).send({message: 'Atualização concluida'})
})

app.post('/dados', (req,res)=>{
    const nome = req.body.nome
    const idade = req.body.idade
    console.log(nome, idade)
    Cliente.create({nome,idade})
    res.status(201).send({message:"dados recebidos"})
})

app.get('/', (req, res)=>{
    res.status(200).send({message: "Teste de Comunicação"})
})

// app.get('/', (req, res)=>{
//     res.status(200).send('Rota Bagual')
// })
/*----------------------------------------------------------------------------------------------*/
conn.sync().then(()=>{
    app.listen(PORT, hostname, (req, res)=>{
    console.log(`Servidor Tchê ${hostname} ${PORT}`)
})
}).catch((error)=>{
    console.error('Erro de conexão meu chegado', error)
})


