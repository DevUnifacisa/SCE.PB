function toggleMenu() {
  var navList = document.getElementById("nav-list");
  if (navList.style.display === "none" || navList.style.display === "") {
    navList.style.display = "flex";
  } else {
    navList.style.display = "none";
  }
}
function limparCampos() {
  document.getElementById("entrada-produtos").reset();
  document.getElementById("valor-total").value = ""; // Limpa o campo de valor total
}

function limparCampos() {
  document.getElementById("saida-produtos").reset();
  document.getElementById("valor-total").value = ""; // Limpa o campo de valor total
}
// Função para calcular o valor total ao modificar o valor unitário ou a quantidade
document
  .getElementById("valor-unitario")
  .addEventListener("input", calcularValorTotal);
document
  .getElementById("quantidade")
  .addEventListener("input", calcularValorTotal);

function calcularValorTotal() {
  const valorUnitario = parseFloat(
    document.getElementById("valor-unitario").value
  );
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!isNaN(valorUnitario) && !isNaN(quantidade)) {
    const valorTotal = valorUnitario * quantidade;
    document.getElementById("valor-total").value = valorTotal.toFixed(2);
  } else {
    document.getElementById("valor-total").value = "";
  }
}
