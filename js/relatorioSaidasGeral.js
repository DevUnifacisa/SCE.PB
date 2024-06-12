document.addEventListener("DOMContentLoaded", function () {
  const tabelaRelatorioSaidas = document
    .getElementById("tabela-relatorio-saidas")
    .getElementsByTagName("tbody")[0];

  // Supondo que você tenha as saídas armazenadas em localStorage
  let saidas = JSON.parse(localStorage.getItem("saidas")) || [];

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

  // Função para gerar o relatório de saídas
  function gerarRelatorioSaidas(saidas) {
    let totalQuantidade = 0;
    let totalValor = 0;

    saidas.forEach((saida) => {
      const novaLinha = tabelaRelatorioSaidas.insertRow();
      const celulaCodigo = novaLinha.insertCell();
      const celulaDescricao = novaLinha.insertCell();
      const celulaQuantidade = novaLinha.insertCell();
      const celulaValorUnitario = novaLinha.insertCell();
      const celulaValorTotal = novaLinha.insertCell();
      const celulaCliente = novaLinha.insertCell();
      const celulaDataVenda = novaLinha.insertCell();

      celulaCodigo.textContent = saida.codigoProduto;
      celulaDescricao.textContent = saida.nomeProduto;
      celulaQuantidade.textContent = saida.quantidade;
      celulaValorUnitario.textContent = formatarValor(saida.valorUnitario);
      celulaValorTotal.textContent = formatarValor(
        saida.quantidade * saida.valorUnitario
      );
      celulaCliente.textContent = saida.cliente;
      celulaDataVenda.textContent = formatarData(saida.dataVenda);

      totalQuantidade += saida.quantidade;
      totalValor += saida.quantidade * saida.valorUnitario;
    });

    // Adicionando a linha de totalização
    const linhaTotal = tabelaRelatorioSaidas.insertRow();
    linhaTotal.classList.add("total-row");
    const celulaTotalLabel = linhaTotal.insertCell();
    celulaTotalLabel.colSpan = 2;
    celulaTotalLabel.textContent = "Total";
    const celulaTotalQuantidade = linhaTotal.insertCell();
    celulaTotalQuantidade.textContent = totalQuantidade;
    const celulaVazia1 = linhaTotal.insertCell();
    const celulaTotalValor = linhaTotal.insertCell();
    celulaTotalValor.textContent = formatarValor(totalValor);
    const celulaVazia2 = linhaTotal.insertCell();
    const celulaVazia3 = linhaTotal.insertCell();
  }

  // Chamar a função para gerar o relatório de saídas
  gerarRelatorioSaidas(saidas);
});
