const {get} = require('axios')
const baseURL = 'https://swapi.dev/api/people'
async function obterPessoas(nome){
    const url = `${baseURL}/?search=${nome}&format=json`
    const results = await get(url)
    return results.data.results.map(mapearPessoas)
}

function mapearPessoas(item){
    return {
        nome: item.name,
        peso: item.height
    }
}

module.exports={
    obterPessoas
}