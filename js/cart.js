


document.addEventListener("DOMContentLoaded", () => {

    function calcularCostos(curr){
        const subtotal = document.querySelector("span.subtotal");
        const envio = document.querySelector("span.envio");
        const total = document.querySelector("span.total");
    
        let subtotalPrice = 0;
        for (let item of document.querySelectorAll(".subtotal-item")){
            subtotalPrice += parseFloat(item.innerText);
        };
        subtotal.innerText = `${curr} ` + subtotalPrice;
        const shippingType = document.querySelector(".tipo-envio:checked");
        
        let shippingPrice = subtotalPrice * parseFloat(shippingType.getAttribute("data-value"));
        envio.innerText = `${curr} ` +  shippingPrice;
    
        total.innerText = `${curr} ` + (subtotalPrice + shippingPrice);
    }

    if (window.location.toString().includes("#purchase-done")){
        swal("Compra realizada con exito!", "Revise su correo para el detalle de su pedido.", "success");
    }
    const containerProduct = document.getElementById('cart-container');
   // const containterCosto = document.getElementById('costos-container');

    //document.getElementById('cant-product').value = cantidadProduct;

    let htmlContentToAppend = "";
    let curr = "";
    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
    .then(response => response.json())
    .then(data => {

        let articulos = "";
        for (let art of data.articles){
            curr = art.currency;
            articulos += `

                    <div id="${art.id}" class="row align-items-center">
                        <div class="col-2">
                            <img class="img-fluid" src="${art.image}"/>
                        </div>
                        <div class="col-2"> 
                            <h4>${art.name}</h4>
                        </div>
                        <div class="col-2">
                        <h4>${art.unitCost}</h4>
                        </div>
                        <div class="col-2">
                        <input data-target="${art.id}" class="cant-product form-control" value=1 type="number" min=1> 
                        </div>
                        <div class="col-2">
                            <h4>${art.currency} <span class="subtotal-item" data-art-id="${art.id}" data-unit-price="${art.unitCost}"> ${art.unitCost}</span></h4>
                        </div>
                    </div><hr/>
                    <hr/>
            `

        }

        htmlContentToAppend += `
        <div class="row align-items-center">
                        <div class="col-2">
                        </div>
                        <div class="col-2"> 
                            <h4><b>Nombre</b></h4>
                        </div>
                        <div class="col-2">
                            <h4><b>Costo</b></h4>
                        </div>
                        <div class="col-2">
                            <h4><b>Cantidad</b></h4>
                        </div>
                        <div class="col-2">
                            <h4><b>Subtotal</b></h4>
                        </div>
                    </div><hr class="border-top-3px"/>

            ${articulos}
            `
                containerProduct.innerHTML = htmlContentToAppend; //Agregar los elementos del contenedor

        //Verificar la cantidad 
        let inputs = document.getElementsByClassName("cant-product");
        for (let input of inputs){
            input.addEventListener("change", event => {
                let source = event.currentTarget;
                let targetId = source.getAttribute("data-target");
                console.log(source, targetId);
                let spanTarget = document.querySelector(`span[data-art-id='${targetId}']`);
                spanTarget.innerText = source.value * parseFloat(spanTarget.getAttribute("data-unit-price"));
                calcularCostos(curr)
            })
        }

        calcularCostos(curr);

    });


    (function () {
        'use strict'
      
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
      
              form.classList.add('was-validated')
            }, false)
          })
      })()

      const paymentOptions = document.querySelectorAll(".payment-option");
      const creditOptionsInputs = document.querySelectorAll(".credit-option");
      const bankOptionsInputs = document.querySelectorAll(".bank-option");
      bankOptionsInputs.forEach(input => input.setAttribute("disabled", true))

      for (let option of paymentOptions){
        option.addEventListener("change", event => {
            let target = event.currentTarget;
            if (target.getAttribute("id") == "bank-option"){
                bankOptionsInputs.forEach(input => input.removeAttribute("disabled"));
                creditOptionsInputs.forEach(input => input.classList.remove("is-invalid"));
                creditOptionsInputs.forEach(input => input.setAttribute("disabled", true))
            } else {
                creditOptionsInputs.forEach(input => input.removeAttribute("disabled"));
                bankOptionsInputs.forEach(input => input.classList.remove("is-invalid"))
                bankOptionsInputs.forEach(input => input.setAttribute("disabled", true))                
            }
        })
      }


      let closeModalBtn = document.getElementById("close-payment-modal");
      closeModalBtn.addEventListener("click", function(event){
        event.preventDefault();
        let selectedPaymentOption = document.querySelector(".payment-option:checked");
        let inputs = document.getElementsByClassName(selectedPaymentOption.getAttribute("id"));

        let invalidCount = 0;
        for (let input of inputs) {
            console.log(input);
            if (input.value.length == 0 ) {
                input.classList.add("is-invalid");
                invalidCount++;
            }
        }

        if (invalidCount != 0){
            return;
        }

        const paymentMethodInput = document.getElementById("payment-method");
        paymentMethodInput.value = selectedPaymentOption.getAttribute("data-name");
        document.getElementById("modal-close").click()       

        })


});
