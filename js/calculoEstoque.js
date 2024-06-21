export function calcularEstoqueAtualizado(codigoProduto, movimentacoes) {
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

// Exportar a função para testes
//module.exports = calcularEstoqueAtualizado;
