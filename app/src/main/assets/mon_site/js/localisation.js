// Mise à jour du fichier localisation.js pour rendre les images responsives et intégrer les modifications CSS

// Fonction appelée lors du clic sur l'onglet "Localiser" du menu
// Fonction pour afficher les images dès le clic sur "Localiser"
function showLocaliser() {
  const contentDiv = document.getElementById('content');
  const initialImagesDiv = document.getElementById('initial-images');
  const accessTriangulation = document.getElementById('access-triangulation');

  // Réinitialise le contenu et affiche les images
  contentDiv.innerHTML = initialImagesDiv.outerHTML + accessTriangulation.outerHTML;
}

// Charger les images dès le chargement de `localisation.html`
window.onload = function() {
  const contentDiv = document.getElementById('content');
  if (contentDiv) {
    showLocaliser();
  }
};


// Fonction pour afficher les images sur la page de localisation
function displayImages() {
  var resultsDiv = document.getElementById("results");

  // Afficher les images supplémentaires sans effet parallax
  var images = [
    'img/image1.jpg',
    'img/image2.jpg',
    'img/image3.jpg',
    'img/image4.jpg',
    'img/image5.jpg'
  ];

  images.forEach(function(imageSrc) {
    var imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    var imgElement = document.createElement('img');
    imgElement.src = imageSrc;
    imgElement.alt = 'Image triangulation';
    imgElement.classList.add('responsive-image'); // Ajout de la classe pour rendre l'image responsive

    imageContainer.appendChild(imgElement);
    resultsDiv.appendChild(imageContainer);
  });
}

// Fonction appelée lors de la soumission du formulaire de localisation
function startTriangulation(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupérer le numéro de téléphone saisi
  var phoneNumber = document.getElementById("phone-number").value;

  // Effacer les résultats précédents
  document.getElementById("results").innerHTML = "";
  document.getElementById("animation").innerHTML = "";

  // Afficher l'animation de recherche
  showLoadingAnimation();

  // Après 3 à 5 secondes, afficher les résultats
  var loadingTime = Math.floor(Math.random() * 2000) + 3000; // Entre 3000ms et 5000ms
  setTimeout(function() {
    // Cacher l'animation
    document.getElementById("animation").innerHTML = "";

    // Afficher les résultats
    displayResults(phoneNumber);
  }, loadingTime);
}

// Fonction pour afficher l'animation de chargement
function showLoadingAnimation() {
  var animationDiv = document.getElementById("animation");
  animationDiv.innerHTML = `
        <div class="spinner"></div>
        <p>Recherche en cours...</p>
    `;
}

// Fonction pour afficher les résultats
function displayResults(phoneNumber) {
  var resultsDiv = document.getElementById("results");

  // Vider les résultats précédents
  resultsDiv.innerHTML = '';

  // Vérifier si le numéro saisi est celui attendu
  if (phoneNumber === "0614687205") {
    // Afficher les résultats spécifiques
    var antennas = [
      { name: "Antenne 3", distance: 150 },
      { name: "Antenne 6", distance: 300 },
      { name: "Antenne 4", distance: 450 }
    ];
  } else {
    // Générer aléatoirement un résultat
    var random = Math.random();
    if (random < 0.5) {
      // Afficher "Non détecté dans la zone"
      resultsDiv.innerHTML = `<p>Non détecté dans la zone.</p>`;
      return;
    } else {
      // Générer des antennes et distances aléatoires
      var antennas = generateRandomAntennas();
    }
  }

  // Afficher les résultats stylisés
  antennas.forEach(function(antenna) {
    var resultItem = document.createElement('div');
    resultItem.className = 'result-item';

    var antennaIcon = document.createElement('img');
    antennaIcon.src = './img/antenna_icon.svg'; // Correction du chemin de l'image
    antennaIcon.alt = 'Antenne';
    antennaIcon.classList.add('responsive-image'); // Ajout de la classe pour rendre l'image responsive

    var antennaInfo = document.createElement('div');
    antennaInfo.className = 'antenna-info';
    antennaInfo.textContent = `${antenna.name} : ${antenna.distance} m`;

    resultItem.appendChild(antennaIcon);
    resultItem.appendChild(antennaInfo);

    resultsDiv.appendChild(resultItem);
  });
}

// Fonction pour générer des antennes et distances aléatoires
function generateRandomAntennas() {
  var antennaNames = ["Antenne 1", "Antenne 2", "Antenne 3", "Antenne 4", "Antenne 5", "Antenne 6"];
  var antennas = [];

  for (var i = 0; i < 3; i++) {
    // Sélectionner un nom d'antenne aléatoire
    var randomIndex = Math.floor(Math.random() * antennaNames.length);
    var name = antennaNames.splice(randomIndex, 1)[0]; // Retirer le nom pour éviter les doublons

    // Générer une distance aléatoire entre 50m et 500m
    var distance = Math.floor(Math.random() * 451) + 50;

    antennas.push({ name: name, distance: distance });
  }

  return antennas;
}

// Fonctions du menu pour rediriger vers dashboard.html
function showVideosurveillance() {
  window.location.href = 'dashboard.html';
}

function showMenusDivers() {
  window.location.href = 'dashboard.html';
}
