const service = require('./service')

main()
async function main(){
   try {
       const resultado = await service.obterPessoas('a')
       const names = []

       /*for (let i=0; i <= resultado.results.length - 1; i++){
            let pessoa = resultado.results[i]
            names.push(pessoa.name)
       }
       console.log('names', names)


       for (let i in resultado.results) {
           let pessoa = resultado.results[i]
            names.push(pessoa.name)
       }
       console.log('names', names)
       */

       for (pessoa of resultado.results){
           names.push(pessoa.name)
       }
       console.log('names', names)
    } catch (error) {
        console.error('internal error', error)
    }
}
