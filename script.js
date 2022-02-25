const validationFactory = (tipoDeValidacao) => {
  let funcao;
  switch (tipoDeValidacao) {
    case "min":
      funcao = min;
      break;
    case "max":
      funcao = max;
      break;
    case "email":
      funcao = email;
      break;
    default:
      console.log(`Validação do tipo ${tipoDeValidacao} não existe.`);
      funcao = null;
      break;
  }
  return funcao;
};


function start(idDoFormulario) {
  const form = document.querySelector(idDoFormulario);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const regras = getRegras();
    if (regras) {
      const ids = getIdsAValidar(regras);
      validar(ids, regras);
      // console.log("enviou");
    }
  });
}

function validar(ids, regras) {
  for (id of ids) {
    let validacoes = getValidacoesPorId(id);
    for (const validacao of validacoes) {
      const parametro = regras[id][validacao];
      const metodo = validationFactory(validacao);
      if (metodo) {
        // console.log(`${id} ${validacao} ${parametro}`);
        console.log(metodo(id, parametro));
      }
    }
  }
}

function getRegras() {
  if (itens.regras) {
    return itens.regras;
  }
  console.log("Itens e regras de validação não definidos.");
  return null;
}

function getIdsAValidar(regras) {
  return Object.keys(regras);
}

function getValidacoesPorId(id) {
  return Object.keys(itens.regras[id]);
}

function getParametroPorValidacao(validacao) {
  return validacao;
}

function min(id, parametro) {
  const input = document.querySelector(`#${id}`);
  if (Number(input.value) < parametro) {
    return false;
  }
  return true;
}

function max(id, parametro) {
  const input = document.querySelector(`#${id}`);
  if (Number(input.value) > parametro) {
    return false;
  }
  return true;
}

function email(id, parametro) {
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
