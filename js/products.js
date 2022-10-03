document.addEventListener("DOMContentLoaded", () => {

  let productData = [];
  //Se obtiene el elemento que funcionará como contenedor para los productos 
    const container = document.getElementById('product-container');
  //Retorna la estructura de cada elemento
    const renderItem = (itemData) => {
        return `<div id="${itemData.id}" class="card my-2 p-3 d-flex flex-row current-target product-item">
        <div class="col-2">
        <img class="img-fluid" src="${itemData.image}" alt="">
        </div>
        <div class="col-10 px-3">
          <div class="d-flex flex-row justify-content-between"><h4>${itemData.name} - ${itemData.currency} ${itemData.cost} </h4> <small>${itemData.soldCount} vendidos</small></div>
          <p>${itemData.description}</p>
        </div>
      </div>`;
    }
    //Trae los productos del json

    //se agrega el catID que es donde se guarda la categoria ingresada 
    let catID = localStorage.getItem('catID');
    //se utiliza un fetch para que redireccione a la categoria ingresada 
    fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`)
    .then(response => response.json())
    .then(data => {
        productData = data.products;
        showProducts();
    })

    // se crea la funcion para ordenar los productos 
    function sortBy(iterable, criterio, propiedad) {

      const asc = (a, b) => {
        if (a[propiedad] > b[propiedad]){
          return 1;
        }

        if (a[propiedad] < b[propiedad]){
          return -1;
        }

        return 0;
      }

      const desc = (a, b) => {
        if (a[propiedad] > b[propiedad]){
          return -1;
        }
        
        if (a[propiedad] < b[propiedad]){
          return 1;
        }

        return 0;
      }

      switch (criterio) {
        case 'ASC':
          iterable.sort(asc);
          break;
        case 'DESC':
          iterable.sort(desc);
          break;
      }

    }


   

    function showProducts(orderType, orderBy){

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
      //Se filtran los productos por precio
      let items = '';
      let itemsToRender = [];
      for ( let item of productData){
        if (((minCountProduct == undefined) || (minCountProduct != undefined && parseInt(item.cost) >= minCountProduct)) &&
        ((maxCountProduct == undefined) || (maxCountProduct != undefined && parseInt(item.cost) <= maxCountProduct))){
          itemsToRender.push(item);
        }
      }

      sortBy(itemsToRender, orderType, orderBy);

      for (let item of itemsToRender){

        items+=renderItem(item);

      }

      container.innerHTML = items; //Agregar los elementos del contenedor

      let renderedItems = document.getElementsByClassName("product-item");
      for (let obj of renderedItems){
        obj.addEventListener('click', (event) => {
          localStorage.setItem('productoClickeado', event.currentTarget.getAttribute('id'))
          window.location = "product-info.html"
        })
      }

    }
    //se utiliza la variable que muestra los productos cuando se utiliza el filtro
    document.getElementById('rangeFilterCountProduct').addEventListener('click' , (event) => {

      showProducts('ASC', 'cost');
    })

    document.getElementById('clearRangeFilterProduct').addEventListener('click' , (event) => {
      document.getElementById("rangeFilterCountProductMin").value = ''
      document.getElementById("rangeFilterCountProductMax").value = ''
      showProducts('ASC', 'cost');
    })

    document.getElementById('labelSortAsc').addEventListener('click', (event) => {
      showProducts('ASC', 'cost');
    })
    
    document.getElementById('labelSortDesc').addEventListener('click', (event) => {
      showProducts('DESC', 'cost');
    })
    
    document.getElementById('labelSortRel').addEventListener('click', (event) => {
      showProducts('DESC', 'soldCount');
    })



});