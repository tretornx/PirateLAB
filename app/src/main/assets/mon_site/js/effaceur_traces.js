document.getElementById('erase-btn').addEventListener('click', function () {
    // Supprime tout le contenu actuel de la page
    document.body.innerHTML = '';

    // Crée le conteneur de l'animation
    const glitchScreen = document.createElement('div');
    glitchScreen.id = 'glitch-screen';
    glitchScreen.innerHTML = `
        <div class="glitch-text">EFFACEMENT EN COURS...</div>
    `;
    document.body.appendChild(glitchScreen);

    // Arrête l’animation après 5 secondes
    setTimeout(() => {
        glitchScreen.innerHTML = `
            <div class="glitch-text">EFFACEMENT TERMINÉ. PRÉPARATION POUR L'EXTINCTION...</div>
        `;

        // Optionnel : Ajouter un délai avant l'extinction
        setTimeout(() => {
            // Place le code pour éteindre la tablette ici
            alert("Simuler l'extinction ici !");
        }, 3000);
    }, 5000);
});
document.getElementById('shutdown-btn').addEventListener('click', function () {
    if (typeof Android !== 'undefined') {
        Android.lockScreenForMinutes(5); // Verrouille l’écran pour 5 minutes
    } else {
        alert("Interface Android non disponible.");
    }
});
// Fonction pour éteindre la tablette
function shutdownDevice() {
    if (typeof Android !== "undefined" && Android.shutdownTablet) {
        Android.shutdownTablet();
    } else {
        alert("Extinction impossible !");
    }
}

// Associer la fonction au bouton
document.getElementById("shutdown-btn").addEventListener("click", shutdownDevice);
