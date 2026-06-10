let clientesJSON = `[ 
    {"nome": "Lucas", "idade": 30, "email": "lucas@email.com"}, 
    {"nome": "Mariana", "idade": 25, "email": "mariana@email.com"} 
]`; 
 
const adicionarCliente = (json, nome, idade, email) => {
    const clientes = JSON.parse(json);

    clientes.push({
        nome,
        idade,
        email
    });

    return JSON.stringify(clientes);
};

const buscarCliente = (json, nome) => {
    const clientes = JSON.parse(json);

    const cliente = clientes.find(cliente => cliente.nome === nome);

    if (!cliente) {
        return "Cliente não encontrado.";
    }

    return `Cliente encontrado:
Nome: ${cliente.nome}
Idade: ${cliente.idade}
Email: ${cliente.email}`;
};
 
// Testando... 
clientesJSON = adicionarCliente(clientesJSON, "Roberto", 40, "roberto@email.com"); 
console.log(buscarCliente(clientesJSON, "Mariana")); 