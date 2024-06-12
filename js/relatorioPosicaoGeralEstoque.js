document.addEventListener("DOMContentLoaded", function () {
  const tabelaEstoque = document
    .getElementById("tabela-estoque")
    .getElementsByTagName("tbody")[0];
  let movimentacaoEstoque = JSON.parse(localStorage.getItem("estoque")) || [];
  let totalEstoque = 0; // Variável para armazenar o valor total do estoque

  // Função para formatar a data no formato brasileiro
  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  // Função para formatar o valor no formato brasileiro
  function formatarValor(valor) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  movimentacaoEstoque.forEach((item) => {
    const novaLinha = tabelaEstoque.insertRow();

    const celulaCodigo = novaLinha.insertCell();
    const celulaDescricao = novaLinha.insertCell();
    const celulaQuantidade = novaLinha.insertCell();
    const celulaValorUnitario = novaLinha.insertCell();
    const celulaTotalEstoque = novaLinha.insertCell(); // Nova célula para o total de estoque
    const celulaEmbalagem = novaLinha.insertCell();
    const celulaAlocacao = novaLinha.insertCell();
    const celulaDataEntrada = novaLinha.insertCell();
    const celulaDataValidade = novaLinha.insertCell();

    celulaCodigo.textContent = item.codigoProduto;
    celulaDescricao.textContent = item.nomeProduto;
    celulaQuantidade.textContent = item.quantidadeEstoque;
    celulaValorUnitario.textContent = formatarValor(item.valorUnitario);
    const totalItem = (item.quantidadeEstoque * item.valorUnitario).toFixed(2); // Calcula o total de cada item
    celulaTotalEstoque.textContent = formatarValor(totalItem);
    celulaEmbalagem.textContent = item.tipoEmbalagem;
    celulaAlocacao.textContent = item.alocacao;
    celulaDataEntrada.textContent = formatarData(item.dataEntrada);
    celulaDataValidade.textContent = formatarData(item.dataValidade);

    totalEstoque += parseFloat(totalItem); // Adiciona o total do item ao total do estoque
  });

  // Adiciona uma última linha para mostrar o valor total do estoque
  const ultimaLinha = tabelaEstoque.insertRow();
  const celulaTotalEstoqueLabel = ultimaLinha.insertCell();
  celulaTotalEstoqueLabel.colSpan = "4"; // Colspan para ocupar as primeiras quatro células
  celulaTotalEstoqueLabel.textContent = "Total Estoque:";
  const celulaTotalEstoqueValor = ultimaLinha.insertCell();
  celulaTotalEstoqueValor.textContent = formatarValor(totalEstoque); // Exibe o total do estoque na última célula
});
