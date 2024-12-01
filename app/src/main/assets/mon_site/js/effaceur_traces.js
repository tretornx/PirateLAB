document.getElementById("start-progress-btn").addEventListener("click", function () {
    const progressBarContainer = document.getElementById("progress-bar-container");
    const progressBar = document.getElementById("progress-bar");
    const glitchScreen = document.getElementById("glitch-screen");

    // Masquer le bouton
    this.style.display = "none";

    // Montrer la barre de progression
    progressBarContainer.style.opacity = "1";

    // Lancer la progression
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;

        // Lorsque la barre atteint 100%
        if (progress >= 100) {
            clearInterval(interval);

            // Afficher l'écran glitch
            glitchScreen.style.display = "flex";

            // Après 3 secondes, verrouiller l'application
            setTimeout(() => {
                glitchScreen.style.display = "none";

                // Appeler la fonction native pour verrouiller
                if (window.Android) {
                    window.Android.lockAppForMinutes(1); // Verrouille pour 1 minute
                }
            }, 3000);
        }
    }, 50); // Progression rapide (50 ms par étape)
});
