// Fonction pour afficher une boîte de dialogue stylisée
function showCustomDialog(message) {
  const dialog = document.getElementById("custom-dialog");
  const messageElement = dialog.querySelector(".dialog-message");
  messageElement.textContent = message;
  dialog.style.display = "flex";
}

// Fonction pour fermer la boîte de dialogue
function closeDialog() {
  const dialog = document.getElementById("custom-dialog");
  dialog.style.display = "none";
}

// Remplace la fonction showCustomDialog() par une version stylisée
window.alert = function(message) {
  showCustomDialog(message);
};

document.addEventListener("DOMContentLoaded", () => {
  // Ajouter la boîte de dialogue personnalisée au document
  const dialogHtml = `
    <div id="custom-dialog" class="dialog-overlay" style="display: none;">
      <div class="dialog-box">
        <h3 class="dialog-title">Information</h3>
        <p class="dialog-message"></p>
        <button class="dialog-button" onclick="closeDialog()">OK</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', dialogHtml);
});
