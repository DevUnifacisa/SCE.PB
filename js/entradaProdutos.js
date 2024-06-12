document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("entrada-produtos");
  const codigoProdutoInput = document.getElementById("codigo-produto");
  const nomeProdutoInput = document.getElementById("nome-produto");
  const valorUnitarioInput = document.getElementById("valor-unitario");
  const quantidadeInput = document.getElementById("quantidade");
  const valorTotalInput = document.getElementById("valor-total");
  const tipoEmbalagemInput = document.getElementById("tipo-embalagem");
  const alocacaoInput = document.getElementById("alocacao");
  const dataValidadeInput = document.getElementById("data-validade");

  // Recuperar os produtos cadastrados do localStorage
  let produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];

  // Preencher a datalist com os produtos cadastrados
  const dataList = document.getElementById("codigo-produto-list");
  produtosCadastrados.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.codigoProduto;
    dataList.appendChild(option);
  });

  // Evento para preencher os campos do formulário ao selecionar um código de produto
  codigoProdutoInput.addEventListener("input", function () {
    let produtoSelecionado = produtosCadastrados.find(
      (produto) => produto.codigoProduto === codigoProdutoInput.value
    );
    if (produtoSelecionado) {
      nomeProdutoInput.value = produtoSelecionado.nomeProduto;
      tipoEmbalagemInput.value = produtoSelecionado.tipoEmbalagem;
      // Se houver informações de alocação e data de validade cadastradas,
      // você pode preenchê-las aqui também
    } else {
      nomeProdutoInput.value = "";
      tipoEmbalagemInput.value = "";
      // Limpe as informações de alocação e data de validade se o produto não for encontrado
      alocacaoInput.value = "";
      dataValidadeInput.value = "";
    }
  });

  // Eventos para calcular o valor total ao modificar o valor unitário ou a quantidade
  valorUnitarioInput.addEventListener("input", calcularValorTotal);
  quantidadeInput.addEventListener("input", calcularValorTotal);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fornecedor = document.getElementById("fornecedor").value;
    const codigoProduto = document.getElementById("codigo-produto").value;
    const nomeProduto = document.getElementById("nome-produto").value;
    const valorUnitario = parseFloat(
      document.getElementById("valor-unitario").value
    );
    const quantidadeEntrada = parseInt(
      document.getElementById("quantidade").value
    );
    const valorTotal = parseFloat(document.getElementById("valor-total").value);
    const tipoEmbalagem = document.getElementById("tipo-embalagem").value;
    const alocacao = document.getElementById("alocacao").value;
    const dataEntrada = document.getElementById("data-entrada").value;
    const dataValidade = document.getElementById("data-validade").value;

    if (isNaN(quantidadeEntrada) || isNaN(valorUnitario) || isNaN(valorTotal)) {
      alert(
        "Quantidade, Valor Unitário e Valor Total devem ser números válidos."
      );
      return;
    }

    // Recuperar o estoque atual do localStorage
    let estoque = JSON.parse(localStorage.getItem("estoque")) || [];

    // Verificar se o produto já está no estoque
    let produtoNoEstoque = estoque.find(
      (item) => item.codigoProduto === codigoProduto
    );

    if (produtoNoEstoque) {
      // Atualizar a quantidade em estoque
      produtoNoEstoque.quantidadeEstoque += quantidadeEntrada;
    } else {
      // Adicionar um novo produto ao estoque
      let novoProduto = {
        fornecedor: fornecedor,
        codigoProduto: codigoProduto,
        nomeProduto: nomeProduto,
        quantidadeEstoque: quantidadeEntrada,
        valorUnitario: valorUnitario,
        tipoEmbalagem: tipoEmbalagem,
        alocacao: alocacao,
        dataEntrada: dataEntrada,
        dataValidade: dataValidade,
      };
      estoque.push(novoProduto);
    }

    // Salvar o estoque atualizado no localStorage
    localStorage.setItem("estoque", JSON.stringify(estoque));
    console.log("Estoque atualizado:", estoque); // Debug

    // Registrar a entrada no histórico de entradas
    let entradas = JSON.parse(localStorage.getItem("entradas")) || [];
    let entrada = {
      fornecedor: fornecedor,
      codigoProduto: codigoProduto,
      nomeProduto: nomeProduto,
      quantidadeEntrada: quantidadeEntrada,
      valorUnitario: valorUnitario,
      valorTotal: valorTotal,
      tipoEmbalagem: tipoEmbalagem,
      alocacao: alocacao,
      dataEntrada: dataEntrada,
      dataValidade: dataValidade,
    };
    entradas.push(entrada);
    localStorage.setItem("entradas", JSON.stringify(entradas));
    console.log("Entradas registradas:", entradas); // Debug

    alert("Entrada de produto registrada com sucesso!");
    form.reset();
  });

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
});
