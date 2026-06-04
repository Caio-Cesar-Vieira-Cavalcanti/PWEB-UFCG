const exportacao = {
    paisDestino: "Estados Unidos",
    produto: {
        nome: "aço",
        valorEmDolares: 100000,
        taxaImposta: 0.25
    },
    empresa: "Siderúrgica Brasil Ltda"
};

const {
    produto: {
        nome,
        valorEmDolares,
        taxaImposta
    },
    empresa
} = exportacao;

const valorComTarifa = valorEmDolares * (1 + taxaImposta);

console.log(`Produto: ${nome}`);
console.log(`Empresa: ${empresa}`);
console.log(`Valor original: US$ ${valorEmDolares}`);
console.log(`Taxa: ${taxaImposta * 100}%`);
console.log(`Valor com tarifa: US$ ${valorComTarifa}`);

/*
Desestruturação aninhada:

const {
    produto: {
        nome,
        valorEmDolares,
        taxaImposta
    },
    empresa
} = exportacao;

É equivalente a:

const nome = exportacao.produto.nome;
const valorEmDolares = exportacao.produto.valorEmDolares;
const taxaImposta = exportacao.produto.taxaImposta;
const empresa = exportacao.empresa;

A desestruturação "entra" no objeto produto e cria variáveis locais
com os valores das propriedades. Após isso, podemos usar diretamente
nome, valorEmDolares e taxaImposta, sem precisar escrever produto.nome.

Obs.: nesse caso NÃO é criada uma variável chamada "produto",
apenas as variáveis extraídas de dentro dele.
*/
