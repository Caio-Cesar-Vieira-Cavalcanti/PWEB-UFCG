const crypto = require('crypto');

// Criptografia de dados
const criptografarMensagem = (texto, chaveSecreta) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(chaveSecreta),
        iv
    );

    let encrypted = cipher.update(texto, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
};

const processarNumeros = (numeros, callbackFunction) =>
    numeros.filter(numero => numero % 2 === 0).map(numero => callbackFunction(numero));



const chaveSecreta = '12345678901234567890123456789012';
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

const resultado = processarNumeros(
    numeros, numero => criptografarMensagem(numero.toString(), chaveSecreta)
);

console.log(resultado);

// Descriptografia dos dados acima
const decritografar = (textoCriptografado, chaveSecreta) => { 
    const algorithm = 'aes-256-cbc'; 
    const [ivHex, encrypted] = textoCriptografado.split(':'); 
    const iv = Buffer.from(ivHex, 'hex'); 
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(chaveSecreta), iv); 

    let decrypted = decipher.update(encrypted, 'hex', 'utf8'); 
    decrypted += decipher.final('utf8');

    return decrypted; 
};

const numerosOriginais = resultado.map(
    textoCriptografado =>
        decritografar(
            textoCriptografado,
            chaveSecreta
        )
);

console.log(numerosOriginais);
