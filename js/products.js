document.addEventListener("DOMContentLoaded", () => {
  //Se obtiene el elemento que funcionará como contenedor para los productos 
    const container = document.getElementById('product-container');
  //Retorna la estructura de cada elemento
    const renderItem = (itemData) => {
        return `<div id="${itemData.id}" class="card row p-3 d-flex flex-row">
        <div class="col-2">
        <img class="img-fluid" src="${itemData.image}" alt="">
        </div>
        <div class="pl-4 col-10">
          <div class="d-flex flex-row justify-content-between"><h4>${itemData.name}</h4> <small>${itemData.soldCount} vendidos</small></div>
          <p>${itemData.description}</p>
        </div>
      </div>`;
    }
    //Trae los productos del json
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json())
    .then(data => {
        let items = "";
        for (let item of data.products) { 
            items += renderItem(item);
            

        }
        console.log(items);
        container.innerHTML = items; //Agregar los elementos del contenedor 
    })


});