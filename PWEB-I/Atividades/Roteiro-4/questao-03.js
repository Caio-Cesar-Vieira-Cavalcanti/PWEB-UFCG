const usuarios = [
  { nome: "Cleciana", idade: "25", ativo: "true", saldo: "1234.56" },
  { nome: "Gustavo", idade: 30, ativo: true, saldo: 980 },
  { nome: "Rayane", idade: null, ativo: "false", saldo: "1500.90" },
  { nome: "Igor", idade: "NaN", ativo: 1, saldo: undefined },
  { nome: "Samuel", idade: "22 anos", ativo: false, saldo: "0" },
];

const normalizarUsuario = (usuario) => {
  let idade;

  if (typeof usuario.idade === "string" && /^\d+$/.test(usuario.idade)) {
    idade = parseInt(usuario.idade);
  } else if (typeof usuario.idade === "number") {
    idade = usuario.idade;
  } else {
    idade = null;
  }
  
  let ativo;

  if (usuario.ativo === true || usuario.ativo === "true" || usuario.ativo === 1) {
    ativo = true;
  } else {
    ativo = false;
  }

  let saldo = parseFloat(usuario.saldo);

  if (isNaN(saldo)) {
    saldo = 0;
  }

  saldo = Number(saldo.toFixed(2)); // Problema ao converter para number e perder as duas casas decimais do toFixed!

  return {
    nome: usuario.nome,
    idade,
    ativo,
    saldo,
  };
};

const processarUsuarios = (lista) => {
  const usuariosNormalizados = lista.map(normalizarUsuario);
  console.log(usuariosNormalizados);
};

processarUsuarios(usuarios);
