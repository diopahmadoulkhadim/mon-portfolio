/* ================================= */
/* VALIDATION DU FORMULAIRE */
/* ================================= */

(() => {

    "use strict";


    const forms =
        document.querySelectorAll(".needs-validation");


    Array.from(forms).forEach(form => {

        form.addEventListener("submit", event => {


            if (!form.checkValidity()) {

                event.preventDefault();

                event.stopPropagation();

            } else {

                event.preventDefault();

                alert(
                    "Merci ! Votre message a bien été validé."
                );

                form.reset();

            }


            form.classList.add("was-validated");

        });

    });

})();



/* ================================= */
/* MODE SOMBRE / CLAIR */
/* ================================= */

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {


    document.body.classList.toggle("dark-mode");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeButton.innerHTML =
            '<i class="bi bi-sun"></i>';

    } else {

        themeButton.innerHTML =
            '<i class="bi bi-moon"></i>';

    }

});



/* ================================= */
/* ANIMATION AU SCROLL */
/* ================================= */

const cards =
    document.querySelectorAll(".card");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "0.6s ease";

    observer.observe(card);

});