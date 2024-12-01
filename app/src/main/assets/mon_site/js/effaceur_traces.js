document.getElementById("start-progress-btn").addEventListener("click", startProgress);

function startProgress() {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%"; // Réinitialise la barre

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            alert("Effacement terminé ! La tablette va redémarrer.");
            // Appeler la méthode Java pour redémarrer
            Android.restartTablet();
        }
    }, 100); // Augmente de 5% toutes les 100ms
}
