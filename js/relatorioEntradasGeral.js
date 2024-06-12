document.addEventListener("DOMContentLoaded", function () {
  const tabelaRelatorioEntradas = document
    .getElementById("tabela-relatorio-entradas")
    .getElementsByTagName("tbody")[0];

  // Supondo que você tenha as entradas armazenadas em localStorage
  let entradas = JSON.parse(localStorage.getItem("entradas")) || [];

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

  // Função para gerar o relatório de entradas
  function gerarRelatorioEntradas(entradas) {
    let valorTotalEstoque = 0;

    entradas.forEach((entrada) => {
      const novaLinha = tabelaRelatorioEntradas.insertRow();
      const celulaCodigo = novaLinha.insertCell();
      const celulaDescricao = novaLinha.insertCell();
      const celulaQuantidade = novaLinha.insertCell();
      const celulaValorUnitario = novaLinha.insertCell();
      const celulaValorTotal = novaLinha.insertCell();
      const celulaFornecedor = novaLinha.insertCell();
      const celulaDataEntrada = novaLinha.insertCell();

      celulaCodigo.textContent = entrada.codigoProduto;
      celulaDescricao.textContent = entrada.nomeProduto;
      celulaQuantidade.textContent = entrada.quantidadeEntrada;
      celulaValorUnitario.textContent = formatarValor(entrada.valorUnitario);
      celulaValorTotal.textContent = formatarValor(
        entrada.quantidadeEntrada * entrada.valorUnitario
      );
      celulaFornecedor.textContent = entrada.fornecedor;
      celulaDataEntrada.textContent = formatarData(entrada.dataEntrada);

      valorTotalEstoque += entrada.quantidadeEntrada * entrada.valorUnitario;
    });

    // Adicionar linha final com o valor total do estoque
    const linhaTotal = tabelaRelatorioEntradas.insertRow();
    const celulaTotalLabel = linhaTotal.insertCell();
    celulaTotalLabel.colSpan = 4;
    celulaTotalLabel.style.textAlign = "left";
    celulaTotalLabel.textContent = "Valor Total de Entradas:";

    const celulaTotalValor = linhaTotal.insertCell();
    celulaTotalValor.colSpan = 3;
    celulaTotalValor.style.textAlign = "left";
    celulaTotalValor.textContent = formatarValor(valorTotalEstoque);
  }

  // Chamar a função para gerar o relatório de entradas
  gerarRelatorioEntradas(entradas);
});
