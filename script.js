const validationFactory = (tipoDeValidacao) => {
  switch (tipoDeValidacao) {
    case "min":
      return min;
      break;
    case "max":
      return max;
      break;
    case "email":
      return email;
      break;

    default:
      break;
  }
};



const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  console.log("enviou");
  event.preventDefault();
});

const regras = itens.regras;
var ids = getIdsAValidar(regras);

for (id of ids) {
  let validacoes = getValidacoesPorId(id);
  for (const validacao of validacoes) {
    console.log(`${id} ${validacao} ${regras[id][validacao]}`);
  }
}

function getIdsAValidar(regras) {
  return Object.keys(regras);
}

function getValidacoesPorId(id) {
  return Object.keys(regras[id]);
}

function getParametroPorValidacao(validacao) {
  return validacao;
}

function min(id, limite) {
  const input = document.querySelector(`#${id}`);
  if (Number(input.value) < limite) {
    return false;
  }
  return true;
}

function max(id, limite) {
  const input = document.querySelector(`#${id}`);
  if (Number(input.value) > limite) {
    return false;
  }
  return true;
}

function email(id) {
  const input = document.querySelector(`#${id}`);
  const padrao = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (padrao.test(input.value)) {
    return true;
  }
  return false;
}
// var a = validationFactory("max");
// console.log(a("nome", 3));
// console.log(a("idade", 3));
