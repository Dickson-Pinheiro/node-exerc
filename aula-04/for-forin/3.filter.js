const {obterPessoas} = require('./service')

async function main(){
    const {results} = await obterPessoas('a')

    const familiaLars = results.filter( pessoa => {
        const isLars = pessoa.name.toLowerCase().indexOf('lars') !== -1
        return isLars
    })

 const names = familiaLars.map(pessoa => pessoa.name)
 console.log(names)
}
main()