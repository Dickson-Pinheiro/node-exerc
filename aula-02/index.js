/*Obter o usuario
Numero de telefone do usuario apartir do id 
Obter endereço*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario(){
        return  new Promise(function resolvePromise(resolve, reject){
                setTimeout(()=> {
                    return resolve({
                        id:'1',
                    nome: 'Aladin',
                    dataNascimento: new Date()
                    })
                }, 1000)
        })
        }


function obterTelefone(idUsuario){

    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: 988730250,
                ddd: 84
            })
        }, 2000)
    })
    
}

function obterEndereco(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            rua: 'Jardim so Éden',
            num: 553,
            bairro: 'Planalto'
        })
    }, 2000)
}

main()
async function main(){
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        
        console.log(`nome: ${usuario.nome}\n telefone:(${telefone.ddd}) ${telefone.telefone}\n endereco \n rua: ${endereco.rua} numero: ${endereco.num}`)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

/*
const usuarioPromise = obterUsuario()

usuarioPromise
.then(function(usuario){
    return obterTelefone(usuario.id).then(
        function(telefone){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: {
                    telefone: telefone.telefone,
                    ddd: telefone.ddd
                }
            }
        }
    )
})
.then(function (dataUser){
    return obterEnderecoAsync(dataUser.usuario.id).then(
        function (result) {
            return {
                endereco: result,
                telefone: dataUser.telefone,
                usuario: dataUser.usuario
            }
        }
    )
}).then(
    function(resultado){
        console.log(resultado)
    }
)
.catch(function(error) {
    console.error('DEU RUIM em USUARIO', error)
})
*/
/*const telefonePromise = obterTelefone()

telefonePromise.then(
    function(result){
        console.log('result', result)
    }
).catch(function(error){
    console.error('DEU RUIM em TELEFONE', error)
})*/


/*
obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error("DEU RUIM em USUARIO", erro)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error("DEU RUIM em TELEFONE", error1)
            return;
        }
    })
    obterEndereco(usuario.id, function resolverTelefone(error2, endereco){
        if (error2) {
            console.error("DEU RUIM em ENDERECO", error2)
        }
        if (endereco){
            console.log(endereco.rua)
        }
    })
})
*/