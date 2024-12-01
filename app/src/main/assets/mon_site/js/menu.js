document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Fonction pour activer/désactiver le menu en mode mobile
  menuToggle.addEventListener("click", () => {
    if (window.innerWidth <= 768) {  // Vérifie que l’écran est de petite taille
      menu.classList.toggle("active");
    }
  });

  // Ajout de la classe 'active' au lien de la page courante
  const currentPage = document.body.getAttribute("data-page");
  if (currentPage) {
    document.querySelectorAll("#menu ul li a").forEach(link => {
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});
