const { deepStrictEqual} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'flash',
    poder: 'speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'lanterna verde',
    poder: 'Anel',
    id: 2
}

describe('Suite de manipulação de herois', () =>{

    before(async()=> {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepStrictEqual(resultado, expected)
    })

    it('deve cadastrar heróis no arquivo', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepStrictEqual(actual ,expected)
    })

    it('deve remover heroi por id', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

        deepStrictEqual(expected, resultado)
    })

    it('deve atualizar um heroi por id', async () => {
        const {nome, poder, id} = DEFAULT_ITEM_ATUALIZAR
        const expected = {nome, poder: 'velocidade', id}
        const novoDado = {poder: 'velocidade'}
        await database.alterar(id, novoDado)
        const [resultado] = await database.listar(id)
        deepStrictEqual(expected, resultado)
    })

})