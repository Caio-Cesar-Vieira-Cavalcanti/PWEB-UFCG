let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

/* =============================================================================
   ETAPA 1 — Converter function declarations para arrow functions
   =============================================================================
   DICA PARA A PROVA:
   - Sintaxe: const nomeFuncao = (param1, param2) => { ... }
   - Se a função tem UMA linha de retorno, pode usar: const fn = (x) => x * 2
   - ATENÇÃO: funções chamadas no HTML via onclick="nomeFuncao()" precisam estar
     no escopo global (window). Arrow functions com let/const NÃO vão pro window!
     Solução: atribuir explicitamente → window.nomeFuncao = (...) => { ... }
   ============================================================================= */

window.adicionaAoCarrinho = (nomeProduto, precoProduto) => {
    const produto = { nome: nomeProduto, preco: precoProduto };
    carrinho.push(produto);
    atualizaContagemCarrinho();
    salvarCarrinho();
    alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
};

const atualizaContagemCarrinho = () => {
    document.getElementById('carrinho-contagem').textContent = carrinho.length;
};

const salvarCarrinho = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

const carregaCarrinho = () => {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizaContagemCarrinho();
    mostrarItensCarrinho();
};

const mostrarItensCarrinho = () => {
    const containerCarrinho = document.getElementById('carrinho-container');
    const totalCarrinho = document.getElementById('carrinho-total');
    if (!containerCarrinho) return; // só existe na página do carrinho
    containerCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, indice) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('carrinho__item');

        itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

        containerCarrinho.appendChild(itemCarrinho);
        total += produto.preco;
    });

    totalCarrinho.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

window.removerItemCarrinho = (indice) => {
    carrinho.splice(indice, 1);
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};

window.limpaCarrinho = () => {
    carrinho = [];
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};


// =============================================================================
// ETAPA 2 — ViaCEP: buscarEndereco + consultaCep
// =============================================================================
// DICA PARA A PROVA:
// - API ViaCEP: GET https://viacep.com.br/ws/{CEP}/json/
// - CEP tem 8 dígitos → use .replace(/\D/g, '') para remover traço/espaços
// - Campos retornados: logradouro, localidade (cidade), uf (estado), bairro...
// - Se CEP não existe, a API retorna { "erro": true }
// - Padrão da prova: encapsular fetch dentro de new Promise(resolve, reject)
// =============================================================================

// URL para buscar: https://viacep.com.br/ws/58400240/json/
// Método http para usar: GET
// Resposta do Reject: reject('Erro ao consultar o CEP'))
const buscarEndereco = (cep) => {
    return new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                if (!response.ok) {
                    reject('Erro ao consultar o CEP');
                    return;
                }
                return response.json();
            })
            .then((data) => {
                // ViaCEP retorna { erro: true } quando o CEP não é encontrado
                if (data.erro) {
                    reject('Erro ao consultar o CEP');
                } else {
                    resolve(data);
                }
            })
            .catch(() => reject('Erro ao consultar o CEP'));
    });
};

window.consultaCep = () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep)
            .then((data) => {
                // Preenche os campos readonly do formulário com os dados da API
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            })
            .catch((error) => alert(error));
    } else {
        alert('CEP inválido!');
    }
};

// =============================================================================
// ETAPA 3 — gerarTextoMarketeiro
// =============================================================================
// DICA PARA A PROVA:
// - Copie o texto do enunciado e substitua {nome}, {email}, etc. por
//   ${dadosFormulario.nome}, ${dadosFormulario.email}, ...
// - Use template literals (crase `) para interpolar variáveis
// - "criado/editado" → verifique se o card já existe (getElementById) antes
// - O método submeterDados chama gerarTextoMarketeiro (com "r"), não geraTextoMarketeiro
// - ATENÇÃO no submeterDados: há duas chaves "endereco" — a segunda (complemento)
//   sobrescreve a primeira (logradouro). Use o que vier em dadosFormulario.endereco
// =============================================================================

const gerarTextoMarketeiro = (dadosFormulario) => {
    // Reutiliza o card se já existir (criar/editar)
    let card = document.getElementById('card-marketeiro');

    if (!card) {
        card = document.createElement('div');
        card.id = 'card-marketeiro';
        card.classList.add('card-marketeiro');

        const container = document.getElementById('cards-container') || document.body;
        container.appendChild(card);
    }

    // BUG no submeterDados: a chave "endereco" aparece 2x (logradouro e complemento).
    // A segunda sobrescreve a primeira, então lemos o logradouro direto do DOM.
    const logradouro = document.getElementById('logradouro').value;
    const complemento = dadosFormulario.endereco;
    const enderecoCompleto = complemento ? `${logradouro}, ${complemento}` : logradouro;

    card.innerHTML = `
        <h3>Texto Marketeiro Gerado</h3>
        <p>Apresentamos ${dadosFormulario.nome}, um profissional altamente qualificado e referência no desenvolvimento avançado de
        software. Com uma trajetória pautada pela inovação e excelência, ${dadosFormulario.nome} tem se destacado na criação de
        soluções tecnológicas de alto impacto, na qual tem transformado desafios complexos em sistemas eficientes
        e escaláveis.</p>
        <p>Comunicável e estrategista, ${dadosFormulario.nome} pode ser contatado via e-mail em ${dadosFormulario.email}, mantendo-se sempre
        disponível para colaborações e projetos que demandem expertise em engenharia de software, inteligência
        artificial e programação web. Seu principal objetivo no momento é ${dadosFormulario.motivo}, reforçando sua busca contínua
        pelo aprimoramento e pela entrega de soluções robustas e inteligentes.</p>
        <p>Atualmente, ${dadosFormulario.nome} reside na dinâmica cidade de ${dadosFormulario.cidade}, no endereço ${enderecoCompleto}, CEP ${dadosFormulario.cep}, onde
        continua sua missão de criar e arquitetar aplicações inovadoras. Seu conhecimento aprofundado em diversas
        linguagens, frameworks e metodologias ágeis o posiciona como um líder técnico capaz de elevar qualquer
        equipe ao mais alto nível de performance.</p>
        <p>Com uma visão futurista e uma abordagem precisa para o desenvolvimento de software, ${dadosFormulario.nome} segue
        transformando o cenário tecnológico com soluções que transcendem expectativas.</p>
    `;
};

// Não mexer neste método
function submeterDados(event) {

    const dadosFormulario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        motivo: document.getElementById('motivo').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('logradouro').value,
        endereco: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    gerarTextoMarketeiro(dadosFormulario);
};


// =============================================================================
// ETAPA 4 — FakeStore API: consultarProdutosExternos + alterarValoresTabela
// =============================================================================
// DICA PARA A PROVA:
// - API: GET https://fakestoreapi.com/products
// - Retorna array de objetos com: title (nome), price (preço), image (foto)
// - Mesmo padrão de Promise + fetch da Etapa 2
// - Na tabela: cells[0] = nome, cells[1] = preço, cells[2] = imagem
// - Para imagem use innerHTML com <img src="..."> (innerText não renderiza img)
// - .slice(0, 6) pega os 6 primeiros produtos (tabela tem 6 linhas)
// =============================================================================

// URL para buscar: https://fakestoreapi.com/products
// Método http para usar: GET
// Resposta do Reject: reject('Erro ao consultar os Produtos'))
const consultarProdutosExternos = () => {
    return new Promise((resolve, reject) => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                if (!response.ok) {
                    reject('Erro ao consultar os Produtos');
                    return;
                }
                return response.json();
            })
            .then((data) => resolve(data))
            .catch(() => reject('Erro ao consultar os Produtos'));
    });
};

window.alterarValoresTabela = () => {
    consultarProdutosExternos()
        .then((data) => {
            const tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
            const produtos = data.slice(0, 6);

            produtos.forEach((produto, index) => {
                const linha = tabela.rows[index];
                if (linha) {
                    linha.cells[0].innerText = produto.title;
                    linha.cells[1].innerText = produto.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    });
                    linha.cells[2].innerHTML = `<img src="${produto.image}" alt="${produto.title}" width="80">`;
                }
            });
        })
        .catch((error) => alert(error));
};

// Não mexer neste método
const modificaValores = ([produto1, produto2, produto3, produto4, produto5, produto6]) => {

    const tabela = document.getElementById("tabelaProdutos").getElementsByTagName('tbody')[0];
    tabela.rows[0].cells[1].innerText = produto1.preco;
    tabela.rows[0].cells[2].innerText = produto1.estoque;
    tabela.rows[1].cells[1].innerText = produto2.preco;
    tabela.rows[1].cells[2].innerText = produto2.estoque;
    tabela.rows[2].cells[1].innerText = produto3.preco;
    tabela.rows[2].cells[2].innerText = produto3.estoque;
    tabela.rows[3].cells[1].innerText = produto4.preco;
    tabela.rows[3].cells[2].innerText = produto4.estoque;
    tabela.rows[4].cells[1].innerText = produto5.preco;
    tabela.rows[4].cells[2].innerText = produto5.estoque;
    tabela.rows[5].cells[1].innerText = produto6.preco;
    tabela.rows[5].cells[2].innerText = produto6.estoque;

};

window.onload = () => carregaCarrinho();
