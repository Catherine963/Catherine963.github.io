// Ningún campo puede estar vacío

// Obtengo las variables del formulario
let email = document.getElementById('email');
let password = document.getElementById('password');

// Invoco al metodo submit del formulario para hacer el chequeo
document.getElementById('registro').addEventListener('submit', function(evento){
    // Verifico que los campos no esten vacios  vacío
    if (email.value.length == 0){
     // si no se cumple lo anterior:
     console.log("ERROR EN VALIDACION");
     showAlertErrorEmail()
     evento.preventDefault();
    } else if (password.value.length == 0){
        // si no se cumple lo anterior:
        showAlertErrorContrasena()
        evento.preventDefault();
       } 
    else {
            // si todo lo anterior es correcto entonces:
            showAlertSuccess();
            saveUserInfo(email.value);
            evento.preventDefault();// Para que se muestre la alerta de suceso.
        }

});
// Se agrega una funcion que gurada los datos ingresando en el email
function saveUserInfo(email){
    localStorage.setItem('userInfo', email)

}

// Funciones para mostrar alerta de error o correcto
function showAlertSuccess() {
document.getElementById("alert-success").classList.add("show");
location.replace("portada.html");
}

function showAlertErrorEmail() {
document.getElementById("alert-danger-email").classList.add("show");
}

function showAlertErrorContrasena() {
document.getElementById("alert-danger-contrasena").classList.add("show");
}


