const frases = [ 
    "JavaScript é poderoso!", 
    "Callbacks são úteis.", 
    "Arrow functions são mais curtas." 
]; 
 
 
const analisarTexto = (array, callback) => { 
    return callback(array);
}; 
 
// Callback que conta o total de palavras em todas as frases 
const contarPalavras = (array) => { 
    return array.reduce((total, frase) => {
        return total + frase.split(" ").length;
    }, 0);
}; 
 
// Callback que encontra a frase com mais palavras 
const maiorFrase = (array) => {
    return array.reduce((maior, frase) => {
        return frase.split(" ").length > maior.split(" ").length ? frase : maior;
    });
};
 
console.log(analisarTexto(frases, contarPalavras)); 
console.log(analisarTexto(frases, maiorFrase));