document.addEventListener("DOMContentLoaded", () => {

    //se agrega el productoClickeado que es donde se guarda la categoria ingresada 
    let productoClickeado = localStorage.getItem('productoClickeado');
    //Se obtiene el elemento que funcionará como contenedor para los productos 
    const containerProduct = document.getElementById('product-container');
    const containerComents = document.getElementById('coment-container');


    let htmlContentToAppend = "";
    fetch(`https://japceibal.github.io/emercado-api/products/${productoClickeado}.json`)
        .then(response => response.json())
        .then(data => {

            let imagenesHtml = '';
            for (let img of data.images){
                imagenesHtml += `<div class="col"><img class="img-fluid" src="${img}"/></div>`
            }
            let imagenesRow = `<div class="row"><p><br><b>Imágenes ilustrativas</b></br></p>${imagenesHtml}</div>`
            let relacionados = '';
            for (let rel of data.relatedProducts){
                relacionados += `<div class="col-3">${rel.name} <img class="img-fluid" src="${rel.image}"/></div>`
            }
            let relacionadosRow = `<div class="row"><p><br><b>Productos relacionados</b></br></p>${relacionados}  </div>`

        htmlContentToAppend += `

        <div id="(${data.id})" >
            <div class="row">
            
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${data.name}</h4>
                        
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


    
    function obtenerEstrellas(score){
        let estrellas = '';
        for(let i=1; i <= score; i++){
               estrellas += '<span class="fa fa-star checked"></span>'
        }
        return estrellas
            
    }

    let htmlContentToAppend1 = "";
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${productoClickeado}.json`)
        .then(response => response.json())
        .then(data => {
            
        
            let comentsHtml = "";
        for (let com of data){
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
        <div class="col"><p>Comentarios</p>${comentsHtml}
        </div>
        </div>
        <div class="row">
        <div class="col">
        <form class="form-control" action=""><p>Comentar</p><p>tu opinion</p><textarea class="w-100 p-3 form-control" name="" id=""  rows="10" ></textarea><p>Puntuacion</p><input class="form-control" type="number" max=5 min=0 > <input type="submit" class="btn btn-primary"> </form>
        
        </div>
        </div>
        `
        containerComents.innerHTML = htmlContentToAppend1; //Agregar los elementos del contenedor

    });
    
    

});

