// JavaScript pour générer des identités aléatoires

const noms = ["Alex Storm", "Jamie Grey", "Taylor Sparks", "Morgan Steele", "Jordan Phoenix"];
const emails = ["mailhack.com", "darkmail.org", "cryptic.net", "fakemail.co"];
const motsDePasse = ["H@ck3r123!", "P@ssw0rd!", "M0nKeyBu$iness", "5ecretH@ven", "Acc3ssD3ni3d"];

function genererIdentifiant() {
  const nom = noms[Math.floor(Math.random() * noms.length)];
  const domaine = emails[Math.floor(Math.random() * emails.length)];
  const email = `${nom.toLowerCase().replace(" ", ".")}@${domaine}`;
  const motDePasse = motsDePasse[Math.floor(Math.random() * motsDePasse.length)];

  document.getElementById("nom").textContent = nom;
  document.getElementById("email").textContent = email;
  document.getElementById("mot-de-passe").textContent = motDePasse;
}

document.getElementById("generate-btn").addEventListener("click", genererIdentifiant);
