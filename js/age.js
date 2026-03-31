document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("age-modal-overlay");
    const inputAge = document.getElementById("input-age");
    const btnSubmit = document.getElementById("btn-submit-age");
    const errorMsg = document.getElementById("age-error-msg");

    // Bloquear temporalmente la capacidad de hacer scroll, para cada que se recargue
    document.body.style.overflow = "hidden";
    overlay.classList.remove("hidden"); // Asegura su visualización en F5

    function verifyAge() {
        const agStr = inputAge.value.trim();
        
        if (!agStr || isNaN(agStr)) {
            errorMsg.textContent = "Por favor ingresa un número válido.";
            return;
        }

        const age = parseInt(agStr, 10);
        
        if (age >= 18) {
            // Usuario admitido (sin guardar session general)
            overlay.classList.add("hidden");
            document.body.style.overflow = "auto";
            errorMsg.textContent = "";
        } else {
            // Edad insuficiente - Rebote visual 
            errorMsg.textContent = "Acceso denegado. Debes tener 18 años o más.";
        }
    }

    btnSubmit.addEventListener("click", verifyAge);

    // Permitir enviar con la tecla Enter desde el formulario input
    inputAge.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            verifyAge();
        }
    });
});
