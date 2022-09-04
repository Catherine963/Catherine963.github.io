document.addEventListener("DOMContentLoaded", () => {

  let productData = [];
  //Se obtiene el elemento que funcionará como contenedor para los productos 
    const container = document.getElementById('product-container');
  //Retorna la estructura de cada elemento
    const renderItem = (itemData) => {
        return `<div id="${itemData.id}" class="card my-2 p-3 d-flex flex-row">
        <div class="col-2">
        <img class="img-fluid" src="${itemData.image}" alt="">
        </div>
        <div class="col-10 px-3">
          <div class="d-flex flex-row justify-content-between"><h4>${itemData.name}</h4> <small>${itemData.soldCount} vendidos</small></div>
          <p>${itemData.description}</p>
        </div>
      </div>`;
    }
    //Trae los productos del json

    //se agrega el catID que es donde se guarda la categoria ingresada 
    let catID = localStorage.getItem('catID');

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
    .then(response => response.json())
    .then(data => {
        productData = data.products;
        showProducts();
    })


    function showProducts(){

      minCountProduct = document.getElementById("rangeFilterCountProductMin").value;
      maxCountProduct = document.getElementById("rangeFilterCountProductMax").value;

      if ((minCountProduct != undefined) && (minCountProduct != "") && (parseInt(minCountProduct)) >= 0){
        minCountProduct = parseInt(minCountProduct);
      }
      else{
        minCountProduct = undefined;
      }

      if ((maxCountProduct != undefined) && (maxCountProduct != "") && (parseInt(maxCountProduct)) >= 0){
        maxCountProduct = parseInt(maxCountProduct);
      }
      else{
        maxCountProduct = undefined;
      }

      let items = '';
      for ( let item of productData){
        if (((minCountProduct == undefined) || (minCountProduct != undefined && parseInt(item.cost) >= minCountProduct)) &&
        ((maxCountProduct == undefined) || (maxCountProduct != undefined && parseInt(item.cost) <= maxCountProduct))){
          items += renderItem(item);
        }
      }

      container.innerHTML = items; //Agregar los elementos del contenedor 

    }

    document.getElementById('rangeFilterCountProduct').addEventListener('click' , (event) => {

      showProducts();
    })

    document.getElementById('clearRangeFilterProduct').addEventListener('click' , (event) => {
      document.getElementById("rangeFilterCountProductMin").value = ''
      document.getElementById("rangeFilterCountProductMax").value = ''
      showProducts();
    })
    
});