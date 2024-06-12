document.addEventListener("DOMContentLoaded", function () {
  const codigoProdutoInput = document.getElementById("codigo-produto");
  const nomeProdutoInput = document.getElementById("nome-produto");

  // Recuperar os produtos cadastrados do localStorage
  let produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];

  // Preencher a datalist com os produtos cadastrados
  const dataList = document.getElementById("codigo-produto-list");
  produtosCadastrados.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.codigoProduto;
    dataList.appendChild(option);
  });

  // Evento para preencher o nome do produto ao selecionar um código de produto
  codigoProdutoInput.addEventListener("input", function () {
    let produtoSelecionado = produtosCadastrados.find(
      (produto) => produto.codigoProduto === codigoProdutoInput.value
    );
    if (produtoSelecionado) {
      nomeProdutoInput.value = produtoSelecionado.nomeProduto;
    } else {
      nomeProdutoInput.value = "";
    }
  });

  // Evento para buscar as movimentações e calcular o estoque atualizado ao submeter o formulário
  document
    .getElementById("form-movimentacao")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const codigoProduto = codigoProdutoInput.value;

      // Buscar as movimentações do produto com o código fornecido
      const movimentacoes = buscarMovimentacoes(codigoProduto);

      const movimentacoesDiv = document.getElementById("movimentacoes");
      movimentacoesDiv.innerHTML = "";

      if (movimentacoes.length === 0) {
        movimentacoesDiv.innerHTML =
          "<p>Nenhuma movimentação encontrada para este produto.</p>";
      } else {
        const table = document.createElement("table");
        const headerRow = table.createTHead().insertRow();
        ["Data", "Tipo", "Quantidade", "Valor Unitário", "Valor Total"].forEach(
          (headerText) => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
          }
        );

        const tbody = table.createTBody();
        movimentacoes.forEach((movimentacao) => {
          const row = tbody.insertRow();
          ["data", "tipo", "quantidade", "valorUnitario", "valorTotal"].forEach(
            (key) => {
              const cell = row.insertCell();
              if (key === "valorUnitario" || key === "valorTotal") {
                cell.textContent = parseFloat(movimentacao[key]).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                );
              } else if (key === "data") {
                cell.textContent = formatarData(movimentacao[key]);
              } else {
                cell.textContent = movimentacao[key];
              }
            }
          );
        });

        movimentacoesDiv.appendChild(table);
      }

      // Buscar e exibir o estoque atualizado do produto
      const estoque = calcularEstoqueAtualizado(codigoProduto, movimentacoes);
      const estoqueQuantidade = document.getElementById("estoque-quantidade");
      const estoqueValor = document.getElementById("estoque-valor");

      estoqueQuantidade.textContent =
        "Quantidade: " + estoque.quantidade.toLocaleString("pt-BR");
      estoqueValor.textContent =
        "Valor: " +
        estoque.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
    });

  // Função para buscar movimentações do produto (entrada e saída)
  function buscarMovimentacoes(codigoProduto) {
    const entradas = JSON.parse(localStorage.getItem("entradas")) || [];
    const saidas = JSON.parse(localStorage.getItem("saidas")) || [];

    // Filtrar e mapear as movimentações de entrada
    const movimentacoesEntrada = entradas
      .filter((mov) => mov.codigoProduto === codigoProduto)
      .map((mov) => ({
        data: mov.dataEntrada,
        tipo: "Entrada",
        quantidade: mov.quantidadeEntrada,
        valorUnitario: mov.valorUnitario,
        valorTotal: mov.valorTotal,
      }));

    // Filtrar e mapear as movimentações de saída
    const movimentacoesSaida = saidas
      .filter((mov) => mov.codigoProduto === codigoProduto)
      .map((mov) => ({
        data: mov.dataVenda,
        tipo: "Saída",
        quantidade: mov.quantidade,
        valorUnitario: mov.valorUnitario,
        valorTotal: mov.valorTotal,
      }));

    return [...movimentacoesEntrada, ...movimentacoesSaida];
  }

  // Função para calcular estoque atualizado com base nas movimentações
  function calcularEstoqueAtualizado(codigoProduto, movimentacoes) {
    let quantidade = 0;
    let valorTotal = 0;

    movimentacoes.forEach((mov) => {
      if (mov.tipo === "Entrada") {
        quantidade += mov.quantidade;
        valorTotal += mov.valorTotal;
      } else if (mov.tipo === "Saída") {
        quantidade -= mov.quantidade;
        valorTotal -= mov.valorTotal;
      }
    });

    return { quantidade, valor: valorTotal };
  }

  // Função para formatar a data no formato brasileiro
  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
  }
});
