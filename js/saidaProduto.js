document.addEventListener("DOMContentLoaded", function () {
  const codigoProdutoInput = document.getElementById("codigo-produto");
  const nomeProdutoInput = document.getElementById("nome-produto");
  const valorUnitarioInput = document.getElementById("valor-unitario");
  const quantidadeInput = document.getElementById("quantidade");
  const valorTotalInput = document.getElementById("valor-total");
  const tipoEmbalagemInput = document.getElementById("tipo-embalagem");

  // Recuperar os produtos cadastrados do localStorage
  let produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
  let estoque = JSON.parse(localStorage.getItem("estoque")) || [];

  // Evento para preencher os campos do formulário ao selecionar um código de produto
  codigoProdutoInput.addEventListener("input", function () {
    let produtoSelecionado = produtosCadastrados.find(
      (produto) => produto.codigoProduto === codigoProdutoInput.value
    );
    if (produtoSelecionado) {
      nomeProdutoInput.value = produtoSelecionado.nomeProduto;
      tipoEmbalagemInput.value = produtoSelecionado.tipoEmbalagem;
    } else {
      nomeProdutoInput.value = "";
      tipoEmbalagemInput.value = "";
    }
  });

  // Eventos para calcular o valor total ao modificar o valor unitário ou a quantidade
  valorUnitarioInput.addEventListener("input", calcularValorTotal);
  quantidadeInput.addEventListener("input", calcularValorTotal);

  function calcularValorTotal() {
    const valorUnitario = parseFloat(valorUnitarioInput.value);
    const quantidade = parseInt(quantidadeInput.value);

    if (!isNaN(valorUnitario) && !isNaN(quantidade)) {
      const valorTotal = valorUnitario * quantidade;
      valorTotalInput.value = valorTotal.toFixed(2);
    } else {
      valorTotalInput.value = "";
    }
  }

  // Função para registrar a saída do produto
  document
    .getElementById("saida-produtos")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const codigoProduto = codigoProdutoInput.value;
      const cliente = document.getElementById("cliente").value;
      const nomeProduto = nomeProdutoInput.value;
      const valorUnitario = parseFloat(valorUnitarioInput.value);
      const quantidade = parseInt(quantidadeInput.value);
      const valorTotal = parseFloat(valorTotalInput.value);
      const dataVenda = document.getElementById("data-venda").value;

      let produtoNoEstoque = estoque.find(
        (item) => item.codigoProduto === codigoProduto
      );

      if (
        !produtoNoEstoque ||
        produtoNoEstoque.quantidadeEstoque < quantidade
      ) {
        alert("Quantidade em estoque insuficiente para realizar a venda.");
        return;
      }

      produtoNoEstoque.quantidadeEstoque -= quantidade;

      let saida = {
        codigoProduto: codigoProduto,
        cliente: cliente,
        nomeProduto: nomeProduto,
        valorUnitario: valorUnitario,
        quantidade: quantidade,
        valorTotal: valorTotal,
        dataVenda: dataVenda,
      };

      let saidas = JSON.parse(localStorage.getItem("saidas")) || [];
      saidas.push(saida);
      localStorage.setItem("saidas", JSON.stringify(saidas));
      localStorage.setItem("estoque", JSON.stringify(estoque));

      alert("Saída de produto registrada com sucesso!");
      document.getElementById("saida-produtos").reset();
    });

  // Função para limpar os campos do formulário
  function limparCampos() {
    document.getElementById("saida-produtos").reset();
  }

  // Adicionar as opções de código de produto ao datalist
  const dataList = document.getElementById("codigo-produto-list");
  produtosCadastrados.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.codigoProduto;
    dataList.appendChild(option);
  });
});
