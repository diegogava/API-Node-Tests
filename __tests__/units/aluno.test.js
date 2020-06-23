const chai = require('chai')
// Extensao da lib chai p/ verificar objetos
const subSet = require('chai-subset')

// Arquivo a ser testado
const index = require('../../index')

chai.use(subSet)

// O atributo do objeto será testado para verificar se ele existe
// O atributo recebe uma função, e ela deve retornar true para o teste passar
const alunoSchema = {
    nome: nome => nome,
    sala: sala => sala
}

function shouldAddAluno() {
    const aluno = index.addAluno('matheus', 'sala 1')
    // Verifica se as caracteristicas do objeto aluno é igual ao alunoSchema
    chai.expect(aluno).to.containSubset(alunoSchema)
}

function shouldGetAlunos() {
    index.addAluno('osmar', 'sala 1')
    index.addAluno('mariana', 'sala 2')
    const alunos = index.getAlunos()
    chai.expect(alunos.length).to.be.equals(3)
    // Primeiro se verifica se está retornando um array
    // Verifica se as caracteristicas dos objetos no array é igual ao alunoSchema
    chai.expect(alunos).to.containSubset([alunoSchema])
}

describe('Teste das funções', () => {
    it('Should add Aluno', shouldAddAluno)
    it('Should get Alunos', shouldGetAlunos)
})

