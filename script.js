function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarContrasena(contrasena) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(contrasena);
}

// Ejemplos de uso:

const emailValido = "ejemplo@dominio.com";
if (validarEmail(emailValido)) {
    console.log("Dirección de correo electrónico válida.");
} else {
    console.log("Dirección de correo electrónico inválida.");
}

const contrasenaValida = "Contras3ña!";
if (validarContrasena(contrasenaValida)) {
    console.log("Contraseña válida.");
} else {
    console.log("Contraseña inválida.");
}