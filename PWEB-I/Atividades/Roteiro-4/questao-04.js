const somarPares = (x) => {
    const inicio = x % 2 === 0 ? x : x + 1;

    const somatorio = (valores) =>
        valores.reduce((acumulador, valor) => acumulador + valor, 0);

    const pares = [];

    for (let i = 0; i < 5; i++) {
        pares.push(inicio + i * 2);
    }

    return somatorio(pares);
};

console.log(somarPares(4));
console.log(somarPares(11));
