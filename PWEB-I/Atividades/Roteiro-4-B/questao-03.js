const funcionarios = [ 
    { nome: "Ana", cargo: "Desenvolvedora", salario: 7000 }, 
    { nome: "Carlos", cargo: "Gerente", salario: 12000 }, 
    { nome: "Beatriz", cargo: "Analista", salario: 5000 } 
]; 
 
const gerarRelatorio = (funcionarios) => {
    const detalhes = funcionarios
        .map(funcionario =>
            `Nome: ${funcionario.nome} - Cargo: ${funcionario.cargo} - Salário: ${funcionario.salario.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}`
        )
        .join('\n');

    const totalFuncionarios = funcionarios.length;
    const salarioMedio = funcionarios.reduce((total, funcionario) => total + funcionario.salario, 0) / totalFuncionarios;

    return `
Relatório de Funcionários
------------------------------------
${detalhes}
------------------------------------
Total de funcionários: ${totalFuncionarios}
Salário médio: ${salarioMedio.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}
`;
};

 
console.log(gerarRelatorio(funcionarios));