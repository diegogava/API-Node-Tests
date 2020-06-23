const app = require('express')()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const alunos = []

const addAluno = (nome, sala) => {
    alunos.push({
        nome: nome,
        sala: sala
    })

    return {
        nome: nome,
        sala: sala
    }
}

const getAlunos = () => {
    return alunos
}

app.get('/aluno', (req, res) => {
    res.status(200)
        .json(getAlunos())
})

app.post('/aluno', (req, res) => {
    res.status(201)
        .json(addAluno(req.body.nome, req.body.sala))
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...\n")
})

module.exports = { app, addAluno, getAlunos }