document.addEventListener("DOMContentLoaded", function () {
  const produtosLista = document.getElementById("produtos-lista");

  let produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
  console.log(
    "Produtos cadastrados ao carregar a página:",
    produtosCadastrados
  );

  if (produtosCadastrados.length === 0) {
    let row = produtosLista.insertRow();
    let cell = row.insertCell();
    cell.colSpan = 5;
    cell.textContent = "Nenhum produto cadastrado.";
    cell.style.textAlign = "center";
  } else {
    produtosCadastrados.forEach((produto) => {
      console.log("Adicionando produto à tabela:", produto);

      let row = produtosLista.insertRow();
      row.insertCell(0).textContent = produto.codigoProduto;
      row.insertCell(1).textContent = produto.nomeProduto;
      row.insertCell(2).textContent = produto.valor.toFixed(2);
      row.insertCell(3).textContent = produto.tipoEmbalagem;

      let acoesCell = row.insertCell(4);
      let editarButton = document.createElement("button");
      editarButton.textContent = "Editar";
      editarButton.onclick = function () {
        alert(`Editar produto: ${produto.codigoProduto}`);
      };

      let excluirButton = document.createElement("button");
      excluirButton.textContent = "Excluir";
      excluirButton.onclick = function () {
        if (
          confirm(
            `Tem certeza que deseja excluir o produto ${produto.codigoProduto}?`
          )
        ) {
          excluirProduto(produto.codigoProduto);
        }
      };

      acoesCell.appendChild(editarButton);
      acoesCell.appendChild(excluirButton);
    });
  }
});

function excluirProduto(codigoProduto) {
  let produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
  produtosCadastrados = produtosCadastrados.filter(
    (produto) => produto.codigoProduto !== codigoProduto
  );
  localStorage.setItem("produtos", JSON.stringify(produtosCadastrados));
  console.log("Produtos após exclusão:", produtosCadastrados);
  location.reload();
}

function toggleMenu() {
  var navList = document.getElementById("nav-list");
  if (navList.style.display === "none" || navList.style.display === "") {
    navList.style.display = "flex";
  } else {
    navList.style.display = "none";
  }
}
