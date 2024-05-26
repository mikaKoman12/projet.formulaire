alert("Vous devez avoir au moins 18 ans pour accéder au formulaire.");

const email = document.querySelector(".email");
const dobInput = document.createElement("input"); // Champ de saisie de la date de naissance
dobInput.setAttribute("type", "date");
dobInput.setAttribute("id", "dob");
dobInput.setAttribute("required", "");
const form = document.querySelector("form");
form.insertBefore(dobInput, form.childNodes[6]); // Insérer le champ de date de naissance avant le bouton "Envoyer"

const button = document.querySelector("#submitBtn");
const errorSpan = document.createElement("span");
errorSpan.textContent = "Vous devez avoir au moins 18 ans pour soumettre le formulaire.";
errorSpan.style.color = "red";
errorSpan.style.display = "none"; // Cacher le message d'erreur par défaut
form.appendChild(errorSpan); // Ajouter le message d'erreur au formulaire

button.disabled = true;

email.addEventListener("blur", () => {
    if (email.value.length > 0 && validateEmail(email.value) && isOldEnough(dobInput.value)) {
        button.disabled = false;
        errorSpan.style.display = "none"; // Cacher le message d'erreur si l'âge est valide
    } else {
        button.disabled = true;
        if (!validateEmail(email.value)) {
            showError("Veuillez saisir une adresse e-mail valide.");
        } else if (!isOldEnough(dobInput.value)) {
            showError("Vous devez avoir au moins 18 ans pour soumettre le formulaire.");
        }
    }
});

button.addEventListener("click", (event) => {
    if (button.disabled) {
        if (!isOldEnough(dobInput.value)) {
            showError("Vous devez avoir au moins 18 ans pour soumettre le formulaire.");
        }
        event.preventDefault(); // Empêche la navigation vers l'URL spécifiée dans href uniquement si le bouton est désactivé
    }
});


// Fonction de validation de l'email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Fonction pour vérifier si l'utilisateur est assez âgé
function isOldEnough(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

dobInput.addEventListener("change", () => {
    if (email.value.length > 0 && validateEmail(email.value) && isOldEnough(dobInput.value)) {
        button.disabled = false;
        errorSpan.style.display = "none"; // Cacher le message d'erreur si l'âge est valide
    } else {
        button.disabled = true;
        if (!isOldEnough(dobInput.value)) {
            showError("Vous devez avoir au moins 18 ans pour soumettre le formulaire.");
        }
    }
});


// Fonction pour afficher le message d'erreur
function showError(errorMessage) {
    errorSpan.textContent = errorMessage;
    errorSpan.style.display = "block";
}




