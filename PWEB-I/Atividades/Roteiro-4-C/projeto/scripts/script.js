const LCC3_LAT = -7.213678;
const LCC3_LON = -35.907139;

const map = L.map('map').setView([LCC3_LAT, LCC3_LON], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcador fixo do LCC3 (UFCG)
const marcadorLCC3 = L.marker([LCC3_LAT, LCC3_LON]).addTo(map)
    .bindPopup("<b>LCC3 (UFCG)</b><br>Ponto de Origem").openPopup();

let marcadorEntrega;
let rotaEntrega;

const carrinho = [];

const adicionarCarrinho = (livro) => {
    carrinho.push(livro);
    atualizarCarrinho();
    alert(`Livro "${livro}" adicionado ao carrinho!`);
};

const atualizarCarrinho = () => {
    const contador = document.getElementById('carrinho-contador');
    const lista = document.getElementById('itens-carrinho');
    contador.innerText = carrinho.length;
    lista.innerHTML = '';

    for (const livro of carrinho) {
        const item = document.createElement('li');
        item.textContent = livro;
        lista.appendChild(item);
    }
};

const toggleCarrinho = () => {
    const carrinhoEl = document.getElementById('carrinho');
    carrinhoEl.style.display = carrinhoEl.style.display === 'block' ? 'none' : 'block';
};

const esvaziarCarrinho = () => {
    carrinho.length = 0;
    atualizarCarrinho();
};

// Fórmula de Haversine para calcular a distância entre dois pontos
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const localizarEndereco = async () => {
    const cep = document.getElementById('cep').value.trim();
    const endereco = document.getElementById('endereco').value.trim();

    if (!cep || !endereco) {
        alert("Por favor, preencha o CEP e o endereço completo.");
        return;
    }

    const query = encodeURIComponent(`${endereco}, ${cep}, Brasil`);

    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await res.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            const latNum = parseFloat(lat);
            const lonNum = parseFloat(lon);

            if (marcadorEntrega) {
                map.removeLayer(marcadorEntrega);
            }
            marcadorEntrega = L.marker([latNum, lonNum]).addTo(map)
                .bindPopup("<b>Endereço de entrega</b>").openPopup();

            // Desenha a linha de rota (LCC3 -> Entrega)
            if (rotaEntrega) {
                map.removeLayer(rotaEntrega);
            }
            rotaEntrega = L.polyline(
                [[LCC3_LAT, LCC3_LON], [latNum, lonNum]],
                { color: '#e74c3c', weight: 4, opacity: 0.8, dashArray: '5, 10' }
            ).addTo(map);

            const bounds = L.latLngBounds([[LCC3_LAT, LCC3_LON], [latNum, lonNum]]);
            map.fitBounds(bounds, { padding: [50, 50] });

            const distancia = calcularDistancia(LCC3_LAT, LCC3_LON, latNum, lonNum);
            const custo = distancia * 1.20;

            const custoDetalhes = document.getElementById('custo-detalhes');
            custoDetalhes.innerHTML = `
                <div class="custo-item">
                    <span class="custo-label">Distância estimada (LCC3 até entrega):</span>
                    <span class="custo-valor">${distancia.toFixed(2).replace('.', ',')} km</span>
                </div>
                <div class="custo-item">
                    <span class="custo-label">Custo da entrega (R$ 1,20 / km):</span>
                    <span class="custo-valor destaque">${custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            `;
        } else {
            alert("Endereço não encontrado. Verifique os dados.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao buscar localização. Tente novamente mais tarde.");
    }
};

// Listener
document.addEventListener('DOMContentLoaded', () => {
    const carrinhoIcon = document.getElementById('carrinho-icon');
    if (carrinhoIcon) {
        carrinhoIcon.addEventListener('click', toggleCarrinho);
    }

    const btnEsvaziar = document.getElementById('btn-esvaziar');
    if (btnEsvaziar) {
        btnEsvaziar.addEventListener('click', esvaziarCarrinho);
    }

    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
    for (const botao of botoesAdicionar) {
        botao.addEventListener('click', (event) => {
            const livroCard = event.target.closest('.book');
            const livro = livroCard.dataset.titulo;
            adicionarCarrinho(livro);
        });
    }

    const btnLocalizar = document.getElementById('btn-localizar');
    if (btnLocalizar) {
        btnLocalizar.addEventListener('click', localizarEndereco);
    }
});