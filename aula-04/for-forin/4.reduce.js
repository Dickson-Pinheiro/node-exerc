const {obterPessoas} = require('./service')

async function main() {
    try {
        const {results} = await obterPessoas('a')
        const pesos = results.map( pessoa => parseFloat(pessoa.height))
        console.log(pesos)
        const total = pesos.reduce((anterior, proximo) => {
            return anterior+proximo
        })
        console.log(total)        
    } catch (error) {
        console.error('DEU RUIM', error)
        
    }

}
main()