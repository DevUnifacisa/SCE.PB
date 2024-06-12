const calcularValorTotalEntrada = require("./js/calculoValorTotalEntrada");

// Mocking DOM elements
global.valorUnitarioInput = { value: "10.00" };
global.quantidadeInput = { value: "5" };
global.valorTotalInput = { value: "" };

test("deve calcular corretamente o valor total", () => {
  calcularValorTotalEntrada();
  expect(global.valorTotalInput.value).toBe("50.00");
});

test("deve limpar o valor total se o valor unitário for NaN", () => {
  global.valorUnitarioInput.value = "abc";
  global.quantidadeInput.value = "5";
  calcularValorTotalEntrada();
  expect(global.valorTotalInput.value).toBe("");
});

test("deve limpar o valor total se a quantidade for NaN", () => {
  global.valorUnitarioInput.value = "10.00";
  global.quantidadeInput.value = "abc";
  calcularValorTotalEntrada();
  expect(global.valorTotalInput.value).toBe("");
});
