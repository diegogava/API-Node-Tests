const chai = require('chai')
// Extensão da lib chai p/ simular requisições http
const http = require('chai-http')
// Extensao da lib chai p/ verificar objetos
const subSet = require('chai-subset')

// Arquivo a ser testado
const index = require('../../index')

chai.use(http)
chai.use(subSet)

// O atributo do objeto será testado para verificar se ele existe
// O atributo recebe uma função, e ela deve retornar true para o teste passar
const alunoSchema = {
    nome: nome => nome,
    sala: sala => sala
}

function shouldPostAluno() {
    chai.request(index.app)
        .post('/aluno')
        .send({
            nome: 'ivete',
            sala: 'sala 2'
        })
        .end((err, res) => {
            chai.expect(err).to.be.null
            chai.expect(res).to.have.status(201)
            chai.expect(res.body).to.containSubset(alunoSchema)
        })
}

function shouldGetAlunos() {
    chai.request(index.app)
        .get('/aluno')
        .end((err, res) => {
            chai.expect(err).to.be.null
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.length).to.be.equal(1)
            chai.expect(res.body).to.containSubset([alunoSchema])
        })
}

describe('Testes de integração', () => {
    it('/aluno - POST', shouldPostAluno)
    it('/aluno - GET', shouldGetAlunos)
})