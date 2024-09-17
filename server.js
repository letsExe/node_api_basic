import express, { response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email, 
            name: req.body.name,
            age: req.body.age
        }
    })

    //users.push(req.body)
    //console.log(req.body) //verifica de deu certo
    res.status(201).json(req.body)
})

 // rota para listar os usuarios 
app.get('/usuarios', async (req, res) =>{

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    } 
    else{
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    console.log(req)
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email, 
            name: req.body.name,
            age: req.body.age
        }
    })

    //users.push(req.body)
    //console.log(req.body) //verifica de deu certo
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuario deletato com sucesso'})

})

app.listen(3000) //node --watch .\server.js


/*app.post('/usuarios') //rota para criar novo usuario
app.put('/usuarios') //editR NOvo usuario
app.delete('/usuarios') //deletar novo usuario*/