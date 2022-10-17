document.addEventListener("DOMContentLoaded", () => {

    //se agrega el productoClickeado que es donde se guarda la categoria ingresada 
    let productoClickeado = localStorage.getItem('productoClickeado');
    //Se obtiene el elemento que funcionará como contenedor para los productos 
    const containerProduct = document.getElementById('product-container');
    const containerComents = document.getElementById('coment-container');


    let urlParams = new URLSearchParams(window.location.search);
    let nextProductId = urlParams.get("nextProductId")

    productoClickeado = (nextProductId != null) ? nextProductId : productoClickeado


    let htmlContentToAppend = "";
    fetch(`https://japceibal.github.io/emercado-api/products/${productoClickeado}.json`)
        .then(response => response.json())
        .then(data => {

            let imagenesHtml = '';
            for (let img of data.images) {
                imagenesHtml += `<div class="col"><img class="img-fluid" src="${img}"/></div>`
            }
            let imagenesRow = `<div class="row"><h4 class="my-5"><br><b>Imágenes ilustrativas</b></br></h4>${imagenesHtml}</div>`
            let relacionados = '';
            for (let rel of data.relatedProducts) {
                relacionados += `
                <div class="col col-md-2 border">
                    <a style="text-decoration:none; color:black;" href="/product-info.html?nextProductId=${rel.id}"> 
                    <div id="${rel.id}">
                        <img class="img-fluid pb-3" src="${rel.image}"/>
                        <div>${rel.name} </div>
                    </div>
                    </a>
                </div>`
            }
            let relacionadosRow = `
                <div class="row">
                <h4 class="my-5"><br><b>Productos relacionados</b></br></h4>
                ${relacionados}
                </div>
            `





            htmlContentToAppend += `

        <div id="(${data.id})" >
            <div class="row">
            
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h2 class="mt-4">${data.name}</h4>
                        
                    </div><hr/>
                    <p  class="mb-1"><b>Precio</b> <br>${data.cost}</br></p>
                    <p  class="mb-1"><b>Descripción</b> <br>${data.description}</br></p>
                    <p  class="mb-1"><b>Categoría</b> <br>${data.category}</br></p>
                    <p  class="mb-1"><b>Cantidad de vendidos</b> <br>${data.soldCount}</br></p>

                </div>
            </div>
            ${imagenesRow}
            ${relacionadosRow}
            
        </div>       
        `
            containerProduct.innerHTML = htmlContentToAppend; //Agregar los elementos del contenedor

        });



    function obtenerEstrellas(score) {
        let estrellas = '';
        for (let i = 1; i <= score; i++) {
            estrellas += '<span class="fa fa-star checked"></span>'
        }
        return estrellas

    }

    let htmlContentToAppend1 = "";
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productoClickeado}.json`)
        .then(response => response.json())
        .then(data => {


            let comentsHtml = "";
            for (let com of data) {
                let estrellasObtenidas = obtenerEstrellas(com.score);
                comentsHtml += `
            <div class="col"><hr/>
                    <p  class="mb-1"><b>${com.user}</b> - ${com.dateTime}  ${estrellasObtenidas}</p> 
                    <p  class="mb-1">${com.description}</p>
            </div>                  
        `
            }

            htmlContentToAppend1 += `
        <div class="row">
        <div class="col"><h4 class="my-5">Comentarios</h4>${comentsHtml}
        </div>
        </div>
        <div class="row">
        <div class="col">
        <form class="form-control mt-5" action=""><p>Comentar</p><textarea placeholder="Escribe tu comentario aqui..." class="w-100 p-3 form-control" name="" id=""  rows="10" ></textarea><label class="form-label mt-3"> Puntuacion</label><input class="form-control" type="number" max=5 min=0 > <input type="submit" class="btn btn-primary my-3"> </form>
        
        </div>
        </div>
        `
            containerComents.innerHTML = htmlContentToAppend1; //Agregar los elementos del contenedor

        });


});

