function redirectToIndex(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulação de verificação de credenciais (aqui você pode adicionar a lógica real de verificação)
  if (username === "admin" && password === "admin") {
    window.location.href = "html/home.html"; // Redireciona para a página home.html
  } else {
    alert("Credenciais inválidas!"); // Mostra uma mensagem de erro se as credenciais estiverem incorretas
  }
}

function toggleMenu() {
  var navList = document.getElementById("nav-list");
  navList.style.display =
    navList.style.display === "none" || navList.style.display === ""
      ? "flex"
      : "none";
}
