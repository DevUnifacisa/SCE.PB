const calcularEstoqueAtualizado = require("./js/calculoEstoque");

test("deve calcular corretamente o estoque atualizado", () => {
  const movimentacoes = [
    { tipo: "Entrada", quantidade: 10, valorTotal: 100 },
    { tipo: "Saída", quantidade: 5, valorTotal: 50 },
    { tipo: "Entrada", quantidade: 3, valorTotal: 30 },
    { tipo: "Saída", quantidade: 2, valorTotal: 20 },
  ];
  const resultado = calcularEstoqueAtualizado("produto1", movimentacoes);
  expect(resultado).toEqual({ quantidade: 6, valor: 60 });
});
