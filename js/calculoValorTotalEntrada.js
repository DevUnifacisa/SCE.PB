function calcularValorTotalEntrada() {
  const valorUnitario = parseFloat(valorUnitarioInput.value);
  const quantidade = parseInt(quantidadeInput.value);

  if (!isNaN(valorUnitario) && !isNaN(quantidade)) {
    const valorTotal = valorUnitario * quantidade;
    valorTotalInput.value = valorTotal.toFixed(2);
  } else {
    valorTotalInput.value = "";
  }
}

// Exportar a função para testes
module.exports = calcularValorTotalEntrada;
