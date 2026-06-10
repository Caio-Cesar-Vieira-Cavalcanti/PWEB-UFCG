/*
Roteiro IV B - Arrow functions, Operador de Desestruturação e funções de Callback (foreach)
*/

const http = require('https')

const dono = {
    "proprietario": "Silvio Santos",
    "endereco": {
        "cep":'hacked, pay to recover',
        "logradouro": 'hacked, pay to recover',
        "complemento": 'hacked, pay to recover',
        "bairro": 'hacked, pay to recover',
        "localidade": 'hacked, pay to recover',
        "uf": '',
        "geo": {
            "lat": "-23.61919020307765",
            "lng": "-46.70793551534256"
        }
    }
}

const getEndereco = cep => {
    const url = `https://viacep.com.br/ws/${cep}/json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let resultado = ''
    
            res.on('data', dados => {
                resultado += dados
            })
    
            res.on('end', () => {
                try {
                    resolve(JSON.parse(resultado))
                } catch(e) {
                    reject(e)
                }
            })
        })
    })
}

getEndereco('05650000').then(endereco => {
    dono.endereco.bairro = endereco.bairro
    dono.endereco.logradouro = endereco.logradouro
    dono.endereco.complemento = endereco.complemento
    dono.endereco.cep = endereco.cep
    dono.endereco.localidade = endereco.localidade
    dono.endereco.uf = endereco.uf

    const {
        proprietario,
        endereco: {
            cep,
            bairro,
            localidade,
            geo: {
                lat,
                lng
            }
        }
    } = dono

    const resultado = `${proprietario} - ${cep} - ${bairro}, ${localidade} (${lat}, ${lng})`

    console.log(resultado);
})