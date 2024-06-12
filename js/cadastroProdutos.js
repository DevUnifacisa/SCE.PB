let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
console.log("Produtos ao carregar a página:", produtos);

function handleCadastroProduto(event) {
  event.preventDefault();

  const codigoProduto = document.getElementById("codigo-produto").value;
  const nomeProduto = document.getElementById("nome-produto").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipoEmbalagem = document.getElementById("tipo-embalagem").value;

  const produto = {
    codigoProduto,
    nomeProduto,
    valor,
    tipoEmbalagem,
  };

  produtos.push(produto);
  console.log("Produto cadastrado:", produto);

  localStorage.setItem("produtos", JSON.stringify(produtos));
  console.log(
    "Produtos após cadastro:",
    JSON.parse(localStorage.getItem("produtos"))
  );

  alert("Produto cadastrado com sucesso!");
  limparCampos();
}

function limparCampos() {
  document.getElementById("cadastro-produto").reset();
}

document
  .getElementById("cadastro-produto")
  .addEventListener("submit", handleCadastroProduto);

// Função para limpar os campos do formulário
function limparCampos() {
  document.getElementById("cadastro-produto").reset();
}

// Adiciona um listener para o evento de submissão do formulário
document
  .getElementById("cadastro-produto")
  .addEventListener("submit", handleCadastroProduto);
