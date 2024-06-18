let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
console.log("Produtos ao carregar a página:", produtos);

async function handleCadastroProduto(event) {
  event.preventDefault();

  const codigoProduto = document.getElementById("codigo-produto").value;
  let nomeProduto = document.getElementById("nome-produto").value.toUpperCase(); // Converter para caixa alta
  const valor = parseFloat(document.getElementById("valor").value);
  const tipoEmbalagem = document.getElementById("tipo-embalagem").value;

  const produto = {
    codigoProduto,
    nomeProduto,
    valor,
    tipoEmbalagem,
  };

  try {
    // Simula uma chamada de API assíncrona para cadastrar o produto
    const response = await salvarProduto(produto);

    if (!response.ok) {
      throw new Error("Erro ao cadastrar produto");
    }

    const data = await response.json();
    console.log("Produto cadastrado no servidor:", data);

    // Adiciona produto à lista local
    produtos.push(produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    console.log(
      "Produtos após cadastro:",
      JSON.parse(localStorage.getItem("produtos"))
    );

    alert("Produto cadastrado com sucesso!");
    limparCampos();
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    alert("Falha ao cadastrar produto. Tente novamente.");
  }
}

async function salvarProduto(produto) {
  // Simula um atraso de 8 segundos para a chamada da API
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // Simula uma resposta bem-sucedida do servidor
  return new Response(JSON.stringify(produto), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function limparCampos() {
  document.getElementById("cadastro-produto").reset();
}

document
  .getElementById("cadastro-produto")
  .addEventListener("submit", handleCadastroProduto);
