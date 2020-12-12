const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')


async function main(){
    Commander.version('v1')
    .option('-n, --nome [value]', "Nome do heroi")
    .option('-p, --poder [value]', "Poder do heroi")
    .option('i, --id [value]', "Id do heroi")

    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "listar herois cadastrados")
    .option('-r, --remover [value]', "remove um heroi por id")
    .option('-a, --atualizar [value]', "atualizar heroi por ai")
    .parse(process.argv)
    
    const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)

            if(!resultado){
                console.error('heroi não foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucerro')

        }

        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
        }

        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)

            if(!resultado){
                console.error('Não foi possível remover o herói')
                return
            }
            console.log('Heroi removido com sucesso')
        }
        
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar)
            const dado = JSON.stringify(heroi)
            const heroiAtualizado = JSON.parse(dado)

            const resultado = await Database.alterar(idParaAtualizar, heroiAtualizado)

            if(!resultado){
                console.error('Não foi possível atualizar o heói')
                return;
            }
            console.log('Heroi atualizado com sucesso')
        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
main()