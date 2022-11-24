




// Validar los datos del perfil 
(function () {
    'use strict'
    let email = document.getElementById('emailInput');
    email.value = localStorage.getItem("userInfo");
    const userData = JSON.parse(localStorage.getItem(email.value));
    if (userData){

    

    let primerNombre = document.getElementById('primerNombreInput');
    primerNombre.value = userData.primerNombre;
    let segundoNombre = document.getElementById('segundoNombreInput');
    segundoNombre.value = userData.segundoNombre;
    let primerApellido = document.getElementById('primerApellidoInput');
    primerApellido.value = userData.primerApellido;
    let segundoApellido = document.getElementById('segundoApellidoInput');
    segundoApellido.value = userData.segundoApellido;
    let telefonoContacto = document.getElementById('telefonoInput');
    telefonoContacto.value = userData.telefonoContacto;}
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()

                }
                saveUserInfo(email.value);
                form.classList.add('was-validated')
            }, false)
        })
})()


function saveUserInfo(email) {
    //Obtengo los datos ingresado en el perfil
    let primerNombre = document.getElementById('primerNombreInput');
    let segundoNombre = document.getElementById('segundoNombreInput');
    let primerApellido = document.getElementById('primerApellidoInput');
    let segundoApellido = document.getElementById('segundoApellidoInput');
    let telefonoContacto = document.getElementById('telefonoInput');;
    const data = {
        'primerNombre': primerNombre.value,
        'segundoNombre': segundoNombre.value,
        'primerApellido': primerApellido.value,
        'segundoApellido': segundoApellido.value,
        'telefonoContacto': telefonoContacto.value

    };
    localStorage.setItem(email, JSON.stringify(data));
    localStorage.setItem("userInfo", email);
}
