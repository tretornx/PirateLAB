// Fonction pour afficher la section Vidéosurveillance avec vérification d'accès
// Fonction pour afficher la section Vidéosurveillance avec vérification d'accès
// Fonction pour afficher la section Vidéosurveillance avec vérification d'accès
// Fonction pour afficher la section Vidéosurveillance avec vérification d'accès
// Fonction pour afficher la section Vidéosurveillance avec vérification d'accès
function showVideosurveillance() {
  document.getElementById("content").innerHTML = `
    <h2>Vérification d'accès</h2>
    <form id="access-form" onsubmit="checkAccess(event)">
      <label for="brand">Marque :</label>
      <input type="text" id="brand" placeholder="Entrez la marque" required>

      <label for="serial-number">Numéro de série :</label>
      <input type="text" id="serial-number" placeholder="Entrez le numéro de série" required>

      <button type="submit">Valider</button>
    </form>

    <!-- Zone d'affichage des vidéos, masquée par défaut et sans contenu -->
    <div id="video-section" style="display: none;"></div>
  `;
}

// Affiche l'animation de piratage
// Fonction pour afficher une animation de piratage avec des messages séquentiels
function showPirateAnimation(duration, callback, success) {
  const pirateAnimation = document.createElement("div");
  pirateAnimation.id = "pirate-animation";
  pirateAnimation.style.display = 'block';

  const messages = success
    ? [
      "Connexion au flux sécurisé...",
      "Décodage des paquets de données...",
      "Cryptage en cours...",
      "Authentification réussie...",
      "Accès aux enregistrements en cours..."
    ]
    : [
      "Connexion au flux sécurisé...",
      "Décodage des paquets de données...",
      "Erreur : Accès refusé...",
      "Tentative de reconnection..."
    ];

  let currentMessageIndex = 0;
  pirateAnimation.innerHTML = `<p>${messages[currentMessageIndex]}</p>`;
  document.body.appendChild(pirateAnimation);

  // Affiche chaque message séquentiellement
  const messageInterval = setInterval(() => {
    currentMessageIndex++;
    if (currentMessageIndex < messages.length) {
      pirateAnimation.innerHTML = `<p>${messages[currentMessageIndex]}</p>`;
    } else {
      clearInterval(messageInterval); // Arrête l'intervalle une fois tous les messages affichés
      pirateAnimation.style.display = 'none';
      pirateAnimation.remove();
      if (callback) callback(); // Appelle la fonction de rappel (callback) après l'animation
    }
  }, duration / messages.length); // Durée de chaque message

  // Fin de l'animation au bout de `duration` millisecondes
  setTimeout(() => {
    clearInterval(messageInterval);
    pirateAnimation.style.display = 'none';
    pirateAnimation.remove();
    if (callback) callback();
  }, duration);
}

// Fonction pour vérifier la marque et le numéro de série pour la page Vidéosurveillance
// Fonction pour vérifier la marque et le numéro de série pour la page Vidéosurveillance
function checkAccess(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const videoSection = document.getElementById('video-section');
  videoSection.style.display = 'none'; // Masque la section vidéo par défaut

  const brand = document.getElementById('brand').value.trim().toLowerCase();
  const serialNumber = document.getElementById('serial-number').value.trim().toLowerCase();
  const requiredBrand = '' +
    '' +
    'samsung';
  const requiredSerial = '5z71f48an';

  if (brand === requiredBrand && serialNumber === requiredSerial) {
    showPirateAnimation(15000, () => {
      videoSection.innerHTML = `
        <div class="video-gallery">
          <div class="video-item">
            <video controls width="400">
              <source src="media/LS-Couloir-2R.webm" type="video/webm">
              <source src="media/LS-Couloir-2R.mp4" type="video/mp4">
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
            <p class="video-title">Couloir 2</p>
          </div>
          <div class="video-item">
            <video controls width="400">
              <source src="media/LS-Porte-CaveR.webm" type="video/webm">
              <source src="media/LS-Porte-CaveR.mp4" type="video/mp4">
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
            <p class="video-title">Porte Cave</p>
          </div>
          <div class="video-item">
            <video controls width="400">
              <source src="media/LS-Porte-Cave-2R.webm" type="video/webm">
              <source src="media/LS-Porte-Cave-2R.mp4" type="video/mp4">
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
            <p class="video-title">Porte Cave 2</p>
          </div>
        </div>
      `;
      videoSection.style.display = 'block';
    }, true);
  } else {
    showPirateAnimation(5000, () => {
      showCustomDialog("Aucun enregistrement récupéré.");
      videoSection.innerHTML = ''; // Supprime le contenu de la section vidéo
    }, false);
  }
}







// Fonction pour afficher la nouvelle section "Localiser"
function showLocaliser() {
  // Effacer le contenu précédent
  document.getElementById("content").innerHTML = "";

  // Supprimer le bouton "Retour en haut" existant s'il y en a un
  let existingBackToTop = document.querySelector('.back-to-top');
  if (existingBackToTop) {
    existingBackToTop.remove();
  }

  // Titre de la section Localisation
  let title = document.createElement('h1');
  title.textContent = 'Localisation';
  document.getElementById("content").appendChild(title);

  // Créer les sections parallax
  for (let i = 1; i <= 5; i++) {
    let section = document.createElement('div');
    section.className = 'parallax-section';
    section.style.backgroundImage = `url('img/image${i}.jpg')`;
    document.getElementById("content").appendChild(section);
  }

  // Ajouter le bouton pour accéder à la triangulation
  let accessSection = document.createElement('section');
  accessSection.id = 'access-triangulation';
  let button = document.createElement('button');
  button.id = 'triangulation-button';
  button.textContent = 'Accéder à la triangulation';
  button.onclick = function() {
    window.location.href = 'triangulation.html';
  };
  accessSection.appendChild(button);
  document.getElementById("content").appendChild(accessSection);

  // Ajouter le bouton "Retour en haut" s'il n'existe pas déjà
  if (!document.querySelector('.back-to-top')) {
    let backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '&uarr;';
    backToTop.onclick = scrollToTop;
    document.body.appendChild(backToTop);

    // Afficher le bouton "Retour en haut" lors du défilement
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });
  }
}

// Fonction pour remonter en haut de la page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fonction pour afficher le contenu des Menus Divers
function showMenusDivers() {
  // Effacer le contenu précédent
  document.getElementById("content").innerHTML = `
        <h2>Menus Divers</h2>
        <!-- Contenu des menus divers -->
    `;
}

document.addEventListener("DOMContentLoaded", function() {
  const page = document.body.getAttribute("data-page");
  // Supprime l'injection de menu pour éviter l'écrasement
});
