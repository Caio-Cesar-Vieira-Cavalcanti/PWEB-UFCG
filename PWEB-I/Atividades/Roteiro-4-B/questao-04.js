const jsonVendas = `[ 
    {"produto": "Notebook", "valor": 4500}, 
    {"produto": "Smartphone", "valor": 2500}, 
    {"produto": "Tablet", "valor": 1800}, 
    {"produto": "Monitor", "valor": 1200} 
]`; 
 
const filtrarVendas = (json, minimo) => { 
    const vendas = JSON.parse(json);
    const vendasFiltradas = vendas.filter(venda => venda.valor > minimo);
    return {
        totalVendas: vendasFiltradas.length,
        vendas: vendasFiltradas
    }
}; 
 
console.log(filtrarVendas(jsonVendas, 2000)); 