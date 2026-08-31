/*
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                      SCRIPT PORTFOLIO - INTERACTIONS                       ║
║                                                                            ║
║  Fonctionnalités :                                                         ║
║  1. Validation du formulaire de contact                                   ║
║  2. Mode sombre/clair avec bascule du thème                               ║
║  3. Animations au scroll pour les cartes (Intersection Observer)          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
*/

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SECTION 1 : VALIDATION DU FORMULAIRE DE CONTACT                            */
/* ═══════════════════════════════════════════════════════════════════════════ */

/*
Description :
  Utilise les méthodes de validation du formulaire Bootstrap.
  Empêche l'envoi si les champs ne sont pas remplis correctement.
  Affiche un message de confirmation si la validation réussit.
*/

(() => {
  "use strict";

  // Récupère tous les formulaires avec la classe "needs-validation"
  const forms = document.querySelectorAll(".needs-validation");

  // Itère sur chaque formulaire trouvé
  Array.from(forms).forEach(form => {
    // Ajoute un écouteur d'événement au formulaire
    form.addEventListener("submit", event => {
      // Vérifie si le formulaire est valide
      if (!form.checkValidity()) {
        // Si invalide, empêche l'envoi par défaut
        event.preventDefault();
        // Arrête la propagation de l'événement
        event.stopPropagation();
      } else {
        // Si valide, affiche un message de confirmation
        event.preventDefault();
        alert("Merci ! Votre message a bien été validé.");
        // Réinitialise le formulaire
        form.reset();
      }

      // Ajoute la classe "was-validated" pour afficher les styles de validation
      form.classList.add("was-validated");
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SECTION 2 : MODE SOMBRE / CLAIR                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */

/*
Description :
  Bascule entre le thème clair (défaut) et le thème sombre.
  L'utilisateur clique sur le bouton dans la navbar pour changer de thème.
  Met à jour l'icône du bouton (lune/soleil) selon le thème actif.
*/

// Récupère le bouton de basculement du thème
const themeButton = document.getElementById("themeButton");

// Ajoute un écouteur au clic sur le bouton
themeButton.addEventListener("click", function () {
  // Bascule la classe "dark-mode" sur l'élément body
  document.body.classList.toggle("dark-mode");

  // Met à jour l'icône du bouton en fonction du thème
  if (document.body.classList.contains("dark-mode")) {
    // Si le mode sombre est activé, affiche l'icône soleil
    themeButton.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    // Si le mode clair est activé, affiche l'icône lune
    themeButton.innerHTML = '<i class="bi bi-moon"></i>';
  }
});

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SECTION 3 : ANIMATIONS AU SCROLL                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

/*
Description :
  Utilise l'API Intersection Observer pour déclencher des animations
  lorsque les cartes deviennent visibles lors du scroll.
  Les cartes apparaissent avec une transition fluide (fade + remontée).
*/

// Récupère toutes les cartes du portfolio
const cards = document.querySelectorAll(".card");

// Crée un observateur pour détecter quand les éléments entrent dans la vue
const observer = new IntersectionObserver(entries => {
  // Itère sur chaque élément observé
  entries.forEach(entry => {
    // Vérifie si l'élément est visible
    if (entry.isIntersecting) {
      // Rend l'élément visible (opacity: 1)
      entry.target.style.opacity = "1";
      // Retire la transformation de translation (remonte à sa position)
      entry.target.style.transform = "translateY(0)";
    }
  });
});

// Configure les cartes avant animation
cards.forEach(card => {
  // Initialise l'opacité à 0 (invisible)
  card.style.opacity = "0";
  // Positionne les cartes 30px plus bas
  card.style.transform = "translateY(30px)";
  // Ajoute une transition fluide pour l'animation
  card.style.transition = "0.6s ease";
  // Ajoute la carte à l'observateur
  observer.observe(card);
});