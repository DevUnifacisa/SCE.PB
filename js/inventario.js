document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-inventario");
  const codigoProdutoInput = document.getElementById("codigo-produto");
  const descricaoProdutoInput = document.getElementById("descricao-produto");
  const alocacaoInput = document.getElementById("alocacao");
  const estoqueAtualInput = document.getElementById("estoque-atual");
  const dataInventarioInput = document.getElementById("data-inventario");

  // Preencher a data do inventário com a data atual
  const dataAtual = new Date().toISOString().split("T")[0];
  dataInventarioInput.value = dataAtual;

  // Recuperar os produtos cadastrados do localStorage
  let produtosEstoque = JSON.parse(localStorage.getItem("estoque")) || [];

  // Preencher a datalist com os códigos de produtos cadastrados
  const dataList = document.getElementById("codigo-produto-list");
  produtosEstoque.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.codigoProduto;
    dataList.appendChild(option);
  });

  // Evento para preencher os campos do formulário ao selecionar um código de produto
  codigoProdutoInput.addEventListener("input", function () {
    let produtoSelecionado = produtosEstoque.find(
      (produto) => produto.codigoProduto === codigoProdutoInput.value
    );
    if (produtoSelecionado) {
      descricaoProdutoInput.value = produtoSelecionado.nomeProduto;
      alocacaoInput.value = produtoSelecionado.alocacao;
      estoqueAtualInput.value = produtoSelecionado.quantidadeEstoque;
    } else {
      descricaoProdutoInput.value = "";
      alocacaoInput.value = "";
      estoqueAtualInput.value = "";
    }
  });

  // Evento de submissão do formulário
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const codigoProduto = codigoProdutoInput.value;
    const contagem = parseInt(document.getElementById("contagem").value);
    const dataInventario = document.getElementById("data-inventario").value;

    // Encontrar o produto correspondente no estoque
    let produtoNoEstoque = produtosEstoque.find(
      (produto) => produto.codigoProduto === codigoProduto
    );

    if (!produtoNoEstoque) {
      alert("Produto não encontrado no estoque.");
      return;
    }

    // Comparar contagem com estoque atual
    if (contagem > produtoNoEstoque.quantidadeEstoque) {
      // Registra entrada no estoque
      const entrada = {
        fornecedor: "Inventario",
        codigoProduto: produtoNoEstoque.codigoProduto,
        nomeProduto: produtoNoEstoque.nomeProduto,
        quantidadeEntrada: contagem - produtoNoEstoque.quantidadeEstoque,
        valorUnitario: produtoNoEstoque.valorUnitario,
        valorTotal:
          (contagem - produtoNoEstoque.quantidadeEstoque) *
          produtoNoEstoque.valorUnitario,
        tipoEmbalagem: produtoNoEstoque.tipoEmbalagem,
        alocacao: produtoNoEstoque.alocacao,
        dataEntrada: dataInventario,
        dataValidade: produtoNoEstoque.dataValidade,
      };
      // Atualizar quantidade em estoque
      produtoNoEstoque.quantidadeEstoque = contagem;
      // Salvar estoque atualizado no localStorage
      localStorage.setItem("estoque", JSON.stringify(produtosEstoque));
      // Adicionar entrada ao histórico de entradas
      let entradas = JSON.parse(localStorage.getItem("entradas")) || [];
      entradas.push(entrada);
      localStorage.setItem("entradas", JSON.stringify(entradas));
    } else if (contagem < produtoNoEstoque.quantidadeEstoque) {
      // Registra saída do estoque
      const saida = {
        cliente: "Inventario",
        codigoProduto: produtoNoEstoque.codigoProduto,
        nomeProduto: produtoNoEstoque.nomeProduto,
        quantidade: produtoNoEstoque.quantidadeEstoque - contagem,
        valorUnitario: produtoNoEstoque.valorUnitario,
        valorTotal:
          (produtoNoEstoque.quantidadeEstoque - contagem) *
          produtoNoEstoque.valorUnitario,
        tipoEmbalagem: produtoNoEstoque.tipoEmbalagem,
        dataVenda: dataInventario,
      };
      // Atualizar quantidade em estoque
      produtoNoEstoque.quantidadeEstoque = contagem;
      // Salvar estoque atualizado no localStorage
      localStorage.setItem("estoque", JSON.stringify(produtosEstoque));
      // Adicionar saída ao histórico de saídas
      let saidas = JSON.parse(localStorage.getItem("saidas")) || [];
      saidas.push(saida);
      localStorage.setItem("saidas", JSON.stringify(saidas));
    } else {
      // Apenas atualiza a data de entrada
      produtoNoEstoque.dataEntrada = dataInventario;
      // Salvar estoque atualizado no localStorage
      localStorage.setItem("estoque", JSON.stringify(produtosEstoque));
    }

    alert("Estoque atualizado com sucesso!");
    form.reset();
  });
});
