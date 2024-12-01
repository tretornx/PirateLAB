document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-erasing-btn");
  const progressSection = document.getElementById("progress-section");
  const progressBar = document.getElementById("progress-bar");
  const statusMessage = document.getElementById("status-message");
  const completionSection = document.getElementById("completion-section");

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    progressSection.style.display = "block";

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.value = progress;

      if (progress >= 100) {
        clearInterval(interval);
        statusMessage.textContent = "Effacement terminé.";
        progressSection.style.display = "none";
        completionSection.style.display = "block";
      }
    }, 500); // Avance toutes les 500 ms
  });
});

function restartTablet() {
  if (typeof Android !== "undefined" && Android.restartTablet) {
    Android.restartTablet();
  } else {
    console.error("Méthode restartTablet non disponible.");
  }
}
