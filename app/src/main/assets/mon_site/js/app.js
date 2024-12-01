// Fonction pour gérer la connexion
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "jackjeff31@gmail.com" && password === "Mycroft1987") {
    showCustomDialog("Connexion réussie !");
    window.location.href = "dashboard.html";
  } else {
    showCustomDialog("Email ou mot de passe incorrect !");
  }
}

// Fonction pour lancer le jeu si l'email est correct
function showHint() {
  const email = document.getElementById("email").value;
  if (email === "jackjeff31@gmail.com") {
    startPuzzleGame();
  } else if (email === "") {
    showCustomDialog("Veuillez entrer un email valide pour afficher l'indice.");
  } else {
    showCustomDialog("L'email saisi n'est pas valide pour obtenir l'indice.");
  }
}

// Fonction pour créer le puzzle des lettres
function startPuzzleGame() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("console-puzzle-container").style.display = "block";

  // Ajoute la classe pour masquer le fond d'écran
  document.body.classList.add("hide-background");

  // Ajouter le texte d'instruction au début du puzzle
  let instruction = document.getElementById("instruction-text");
  if (!instruction) {
    instruction = document.createElement("p");
    instruction.id = "instruction-text";
    instruction.classList.add("instruction");  // Associe un style CSS spécifique
    instruction.innerText = "Faites glisser les lettres pour reconstituer le mot secret.";
    document.getElementById("console-puzzle-container").insertBefore(instruction, document.getElementById("console-items"));
  }

  createPuzzle();

  let retourButton = document.getElementById("retour-button");
  if (!retourButton) {
    retourButton = document.createElement("button");
    retourButton.id = "retour-button";
    retourButton.classList.add("ok-button");
    retourButton.innerText = "Retour";
    retourButton.onclick = () => {
      window.location.href = "index.html"; // Redirige vers la page de connexion
      document.body.classList.remove("hide-background"); // Enlève la classe pour afficher le fond
    };
    document.getElementById("console-puzzle-container").appendChild(retourButton);
  }
}



function createPuzzle() {
  const letters = [
    { name: 'L', img: 'img/L.svg' },
    { name: 'K', img: 'img/K.svg' },
    { name: 'R', img: 'img/R.svg' },
    { name: 'H', img: 'img/H.svg' },
    { name: 'S', img: 'img/S.svg' },
    { name: 'E', img: 'img/E.svg' },
    { name: 'C', img: 'img/C.svg' },
    { name: 'O', img: 'img/O.svg' }
  ];

  const itemsContainer = document.getElementById("console-items");
  itemsContainer.innerHTML = ''; // Vide le conteneur au début

  letters.forEach(letter => {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("console-item");
    letterDiv.dataset.letter = letter.name;
    letterDiv.draggable = true;
    letterDiv.innerHTML = `<img src="${letter.img}" alt="${letter.name}">`;
    letterDiv.addEventListener("dragstart", handleDragStart);
    letterDiv.addEventListener("dragend", handleDragEnd);
    letterDiv.addEventListener("touchstart", handleTouchStart, { passive: false });
    letterDiv.addEventListener("touchmove", handleTouchMove, { passive: false });
    letterDiv.addEventListener("touchend", handleTouchEnd);
    itemsContainer.appendChild(letterDiv);
  });
}

// Gestion des déplacements et de l'ordre du puzzle
let draggedItem = null;
let originalIndex = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function handleDragStart(event) {
  draggedItem = this;
  originalIndex = [...this.parentNode.children].indexOf(this);
  setTimeout(() => {
    this.style.opacity = '0.5';
  }, 0);
}

function handleDragEnd() {
  setTimeout(() => {
    this.style.opacity = '1';
    draggedItem = null;
    checkLetterPositions();
  }, 0);
}

function handleTouchStart(event) {
  event.preventDefault();
  draggedItem = this;
  draggedItem.style.opacity = '0.5';
  const touch = event.touches[0];
  touchOffsetX = touch.clientX - draggedItem.getBoundingClientRect().left;
  touchOffsetY = touch.clientY - draggedItem.getBoundingClientRect().top;
}

function handleTouchMove(event) {
  event.preventDefault();
  const touch = event.touches[0];
  draggedItem.style.position = 'absolute';
  draggedItem.style.left = (touch.clientX - touchOffsetX) + 'px';
  draggedItem.style.top = (touch.clientY - touchOffsetY) + 'px';
}

function handleTouchEnd(event) {
  draggedItem.style.opacity = '1';
  draggedItem.style.position = 'relative';
  draggedItem.style.left = 'auto';
  draggedItem.style.top = 'auto';
  const afterElement = getDragAfterElement(document.getElementById('console-items'), event.changedTouches[0].clientX);
  const currentContainer = document.getElementById('console-items');
  if (afterElement == null) {
    currentContainer.appendChild(draggedItem);
  } else {
    currentContainer.insertBefore(draggedItem, afterElement);
  }
  draggedItem = null;
  checkLetterPositions(); // Vérifie la position des lettres après déplacement
}

document.getElementById("console-items").addEventListener("dragover", function(event) {
  event.preventDefault();
  const afterElement = getDragAfterElement(this, event.clientX);
  const currentContainer = document.getElementById("console-items");
  if (afterElement == null) {
    currentContainer.appendChild(draggedItem);
  } else {
    currentContainer.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, x) {
  const draggableElements = [...container.querySelectorAll(".console-item:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Fonction pour vérifier la position des lettres "S", "H", et "K"
function checkLetterPositions() {
  const items = document.querySelectorAll("#console-items .console-item");
  items.forEach(item => item.style.borderBottom = ''); // Réinitialise la bordure

  if (items[0].dataset.letter === 'S') {
    items[0].style.borderBottom = "3px solid #4CAF50"; // "S" bien placé
  }
  if (items[1].dataset.letter === 'H') {
    items[1].style.borderBottom = "3px solid #4CAF50"; // "H" bien placé
  }
  if (items[items.length - 1].dataset.letter === 'K') {
    items[items.length - 1].style.borderBottom = "3px solid #4CAF50"; // "K" bien placé
  }
}

// Nouvelle fonction pour valider l'ordre complet des lettres
function validateOrder() {
  const items = document.querySelectorAll("#console-items .console-item");
  const sherlockOrder = ['S', 'H', 'E', 'R', 'L', 'O', 'C', 'K'];
  let correct = true;

  items.forEach((item, index) => {
    if (item.dataset.letter !== sherlockOrder[index]) {
      correct = false;
    }
  });

  if (correct) {
    showCustomDialog("Mon compagnon canin et l'année de mon arrivée sur Terre.");
    document.getElementById("console-puzzle-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
  } else {
    showCustomDialog("Dommage, réessayez !");
  }
}

// Ajoute l'écouteur pour le bouton "Valider l'ordre"
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("login-button").addEventListener("click", login);
  document.getElementById("hint-link").addEventListener("click", function(event) {
    event.preventDefault();
    showHint();
  });
  document.getElementById("validate-order").addEventListener("click", validateOrder); // Écouteur pour valider l'ordre
});

// Fonction pour afficher l'indice pendant le jeu
// Fonction pour afficher l'indice pendant le jeu avec un effet de fondu
// Fonction pour afficher l'indice pendant le jeu avec un effet de fondu plus lent
// Fonction pour afficher l'indice principal "Élémentaire..."
function afficherIndiceJeu() {
  const puzzleContainer = document.getElementById("console-puzzle-container");
  if (puzzleContainer && puzzleContainer.style.display !== "none") {
    let indice = document.getElementById("indice");
    if (!indice) {
      indice = document.createElement("p");
      indice.id = "indice";
      indice.textContent = "Élémentaire...";
      puzzleContainer.appendChild(indice);

      // Déclenche l'effet de fondu
      setTimeout(() => {
        indice.style.opacity = 1;
      }, 200);
    }
  }
}

// Fonction pour afficher "mon cher..." 30 secondes après "Élémentaire..."
function afficherIndiceMonCher() {
  const puzzleContainer = document.getElementById("console-puzzle-container");
  let monCher = document.getElementById("mon-cher");
  if (!monCher) {
    monCher = document.createElement("p");
    monCher.id = "mon-cher";
    monCher.textContent = "mon cher...";
    monCher.style.opacity = 0;
    monCher.style.transition = "opacity 4s ease-in";
    monCher.style.color = "red";
    monCher.style.fontSize = "1.5em";
    monCher.style.fontStyle = "italic";
    monCher.style.fontWeight = "bold";
    monCher.style.marginTop = "5px";
    monCher.style.textAlign = "center";
    puzzleContainer.appendChild(monCher);

    setTimeout(() => {
      monCher.style.opacity = 1;
    }, 200); // Effet de fondu
  }
}

// Fonction pour afficher "Watson !!!" 30 secondes après "mon cher..."
function afficherIndiceWatson() {
  const puzzleContainer = document.getElementById("console-puzzle-container");
  let watson = document.getElementById("watson");
  if (!watson) {
    watson = document.createElement("p");
    watson.id = "watson";
    watson.textContent = "Watson !!!";
    watson.style.opacity = 0;
    watson.style.transition = "opacity 4s ease-in";
    watson.style.color = "red";
    watson.style.fontSize = "1.5em";
    watson.style.fontStyle = "italic";
    watson.style.fontWeight = "bold";
    watson.style.marginTop = "5px";
    watson.style.textAlign = "center";
    puzzleContainer.appendChild(watson);

    setTimeout(() => {
      watson.style.opacity = 1;
    }, 200); // Effet de fondu
  }
}

// Minuteries pour afficher les messages à intervalles de 30 secondes
setTimeout(afficherIndiceJeu, 20000);      // Affiche "Élémentaire..." après 30 secondes
setTimeout(afficherIndiceMonCher, 30000);  // Affiche "mon cher..." 30 secondes après
setTimeout(afficherIndiceWatson, 40000);   // Affiche "Watson !!!" 30 secondes après

