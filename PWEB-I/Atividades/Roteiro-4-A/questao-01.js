const vendas = [
    { produto: "Notebook", preco: 4500, quantidade: 3, vendedor: "Sara" },
    { produto: "Smartphone", preco: 2300, quantidade: 5, vendedor: "Matheus" },
    { produto: "Monitor", preco: 1200, quantidade: 2, vendedor: "Gabriel" },
    { produto: "Teclado Mecânico", preco: 350, quantidade: 4, vendedor: "Sara" },
    { produto: "Notebook", preco: 4500, quantidade: 6, vendedor: "Gabriel" },
    { produto: "Monitor", preco: 1200, quantidade: 3, vendedor: "Matheus" }
];

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const gerarRelatorio = (vendas) => {
    let totalGeral = 0;
    const comissoes = {};

    const relatorioVendas = vendas.map(venda => {
        const totalVenda = venda.preco * venda.quantidade;

        totalGeral += totalVenda;

        if (!comissoes[venda.vendedor]) {
            comissoes[venda.vendedor] = 0;
        }

        comissoes[venda.vendedor] += totalVenda * 0.05;

        return `
- Produto: ${venda.produto}
  Quantidade: ${venda.quantidade}
  Preço Unitário: ${formatarMoeda(venda.preco)}
  Total: ${formatarMoeda(totalVenda)}
  Vendedor: ${venda.vendedor}
`;
    }).join('\n');

    const relatorioComissoes = Object.entries(comissoes).map(([vendedor, comissao]) => `${vendedor}: ${formatarMoeda(comissao)}`).join('\n');

    return `
Relatório de Vendas:

${relatorioVendas}

Total Geral: ${formatarMoeda(totalGeral)}

Total de comissão (5%):
${relatorioComissoes}
`;
};


console.log(gerarRelatorio(vendas));
