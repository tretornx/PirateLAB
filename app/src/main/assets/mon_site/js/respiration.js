const breathText = document.getElementById("breath-in-out");

function updateBreathingText() {
  const isInhaling = getComputedStyle(document.getElementById("circle")).transform.includes("1.5");
  breathText.textContent = isInhaling ? "Inspirez" : "Expirez";
}

// Synchronisation toutes les 5 secondes
setInterval(updateBreathingText, 5000);
