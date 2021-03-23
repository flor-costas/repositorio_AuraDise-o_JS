let carrito = [];
if(localStorage.getItem("carrito") != null){  
  let productosDelCarrito = JSON.parse(localStorage.getItem("carrito")); 
  carrito = productosDelCarrito;
  }
  // document.getElementById('contador').innerHTML = carrito.length;
 $("#contador").html(carrito.length);
 

 let baseDeDatos = [];  
  $.ajax ({
    url:"/assets/json/data.json",
    type: 'get',
    data: {
      "items": baseDeDatos,
    },
    success: function (data){
      baseDeDatos = data;
      console.info(baseDeDatos);
      viewProductos();
    }, 
    error:function(){
      console.log ("no se ha podido obtener la información")
    }
  });


 let cards = ``
 function viewProductos (){
 for (let i=0; i<baseDeDatos.length; i++){
   if (baseDeDatos[i].stock>0){
 cards +=`
   <div class="" id="listaDeProductos"> 
     <div class="col mb-4">
       <div class="card h-100">
         <img src=${baseDeDatos[i].imagen} class="card-img-top" width="350px" height="370px">
         <div class="card-body">
           <h5 class="card-title">
             <a href="../assets/productos.html" id="nombreDeProducto"> ${baseDeDatos[i].nombre} </a>
           </h5>
           <p class="card-text"> $${baseDeDatos[i].precio}</p>
           <p class="card-text">Stock: ${baseDeDatos[i].stock}</p>
           <p class="card-text">${baseDeDatos[i].personalizar}</p>
         </div>
         <div id="detallesProductos" class="row-cols-md-1">
             <button type="button" class="btn btn-sm btn-outline-danger col-1 mx-auto" data-toggle="modal" data-target="#itemDetalle" id="detailsP">
                Detalle del producto 
             </button>
         </div>

         <div class="modal" tabindex="-1" id="itemDetalle">
         <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title"> ${baseDeDatos[i].nombre} </h5>
             <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">&times;</button>
           </div>
           <div class="modal-body">
             <p>${baseDeDatos[i].detalle}</p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(baseDeDatos[i])})'>
                Añadir al carrito
             </button>
           </div>
         </div>
       </div>
       </div>

       <div class="card-footer row-cols-md-1">
             <button type="button" class="btn btn-secondary col-2 mx-auto" onclick='agregarAlCarrito(${JSON.stringify(baseDeDatos[i])})'>
                 Añadir al carrito
             </button>
       </div>
       </div>
     </div>
   </div>
   `;
   }
   else if (baseDeDatos[i].stock===0){
     cards += `
     <div class="" id="listaDeProductos"> 
     <div class="col mb-4">
       <div class="card h-100">
         <img src=${baseDeDatos[i].imagen} class="card-img-top" width="350px" height="370px">
         <div class="card-body">
           <h5 class="card-title">
             <a href="#"> ${baseDeDatos[i].nombre} </a>
           </h5>
           <p class="card-text"> $${baseDeDatos[i].precio}</p>
           <p class="card-text">Stock: ${baseDeDatos[i].stock}</p>
           <p class="card-text">${baseDeDatos[i].personalizar}</p>
         </div>
         <div id="detallesProductos" class="row-cols-md-1">
           <button type="button" class="btn btn-sm btn-outline-danger col-1 mx-auto " data-toggle="modal" data-target="#itemDetalle" id="detailsP">
           Detalle del producto 
           </button>
         </div>


         <div class="modal" tabindex="-1" id="itemDetalle">
         <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <h5 id="tituloProducto" class="modal-title"> ${baseDeDatos[i].nombre} </h5>
             <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">&times;</button>
           </div>
           <div class="modal-body">
             <p>${baseDeDatos[i].detalle}</p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(baseDeDatos[i])})'>
                Añadir al carrito
             </button>
           </div>
         </div>
       </div>
       </div>

         <div class="card-footer row-cols-md-1">
             <button type="button" class="btn btn-secondary col-2 mx-auto" id="botonCarrito" >
                 No hay stock
             </button>
       </div>
       </div>
     </div>
   </div>
   `} 
}
$("#productos").html(cards);   
 }
 

// document.getElementById ("productos").innerHTML= cards;





 fetch('/assets/json/data.json').then(respestaServer => {
   return respuestaServer.json()
   }).then(valorDelServer => {
     console.log(valorDelServer);
   });


    // ARRAY CUADROS INFANTILES
    // let cuadrosInfantiles = listaProductos.slice(12, 21);
    // console.log(cuadrosInfantiles); 



function agregarAlCarrito(producto){
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  document.getElementById('contador').innerHTML = carrito.length;
  console.log(carrito);

//precio-total
let precioTotal = 0;
for(let i=0; i<carrito.length; i++){
    precioTotal += carrito[i].precio;
    console.log(carrito[i].precio);
}
document.getElementById('preciototal').innerHTML = "$" +precioTotal;
console.log("$" +precioTotal);
}


let listaCarrito = ``
  for (let i = 0; i<carrito.length; i++){
    // console.log(carrito[i]);
      if (carrito [i].stock>=0){
        listaCarrito += `
        <div class="table-responsive">
        <table class="table-hover  table-sm  table-bordered" id="carritoDesglosadoP">
        <tbody id="carritoTabla">
        <tr>
          <td colspan="3" class="listItems"></td>
          <td colspan="3"><img class="img-thumbnail" src=${carrito[i].imagen} width="100px" height="100px"></td>
          <td colspan="3" class="nameTable">${carrito[i].nombre}</td>
          <td colspan="3">${carrito.push.length} 
            <button id='aumentar' onclick="aumentar()">+</button>
            <button id='disminuir' onclick="disminuir()">-</button>    
            <input type='text' class="cantidad" value="0">
          </td>
          <td colspan="3">$ ${carrito[i].precio}</td>
          <td colspan="3"><button type="button" onclick="borrarElementoDelCarrito(event, id)" class="btn-close" data-dismiss="modal" id="delete" aria-label="Close">&times;</button></div></td>
        </tr>
      </tbody>
    </table>
    <tr> 
    </div>
      `;
    }
 
$("#carritoTabla").html(listaCarrito);
  }

  // let compraTotal = 0;
  // for(let i=0; i<carrito.length; i++){
  //     compraTotal += carrito[i].precio;
  //   }
  //         document.getElementById('totales').innerHTML = "$" + compraTotal;

  // console.log("$" + compraTotal);


  function borrarElementoDelCarrito(e){
    const carritoActualizado = [];
    for (let i = 0; i < carrito.length; i++){
      if (i != 1){
        carritoActualizado.push(carrito[i]);
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    carrito = carritoActualizado;
    document.getElementById('contador').innerHTML = carrito.length;
    document.getElementById('delete').innerHTML = event.target.value
  }
  
  $("#delete").click(function(e) {
    console.log(this);
    console.log(e.target);
    const productoQuitado = producto.find(producto => producto.id == e.target.parentElement.id);
    carritoActualizado.push(productoQuitado);
  });


var inicio = 1;
  function aumentar(){
  var cantidad = document.getElementsByClassName('cantidad').value = ++inicio;
  }
  function disminuir(){ 
  var cantidadII = document.getElementsByClassName('cantidad').value = --inicio;
  }


// vaciarCarrito
function vaciarCarrito(){
localStorage.clear("carritoActualizado", JSON.stringify(carritoActualizado));
}




$.post('https://api.mercadopago.com/checkout/preferences',
{
  "items": [
    {
      "title": "Cuadro set Pastel", 
      "description": "Personalizable",
      "quantity": 1,
      "currency_id": "ARS",
      "unit_price": 2700,
    }
  ]
});

$.ajax({
  url: 'https://api.mercadopago.com/checkout/preferences',
  type: 'post',
  data:{
    "items": listaCarrito,
  },
  headers:{
    'content-type':'application/json',
    'authorization': 'TEST-500102427724967-031621-ba28a9c7fe9750cafa07ad59c81f89a3-600299121'
  },
  success: function(data){
    console.info(data);
  }
});

// COMIENZO MP
window.Mercadopago.setPublishableKey("TEST-6d0afbcf-cd2e-46e0-863d-61d7985ca942");
document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

function guessPaymentMethod(event) {
   let cardnumber = document.getElementById("cardNumber").value;
   if (cardnumber.length >= 6) {
       let bin = cardnumber.substring(0,6);
       window.Mercadopago.getPaymentMethod({
           "bin": bin
       }, setPaymentMethod);
   }
};

function setPaymentMethod(status, response) {
   if (status == 200) {
       let paymentMethod = response[0];
       document.getElementById('paymentMethodId').value = paymentMethod.id;

       getIssuers(paymentMethod.id);
   } else {
       alert(`payment method info error: ${response}`);
   }
};

function getIssuers(paymentMethodId) {
  window.Mercadopago.getIssuers(
      paymentMethodId,
      setIssuers
  );
}

function setIssuers(status, response) {
  if (status == 200) {
      let issuerSelect = document.getElementById('issuer');
      response.forEach( issuer => {
          let opt = document.createElement('option');
          opt.text = issuer.name;
          opt.value = issuer.id;
          issuerSelect.appendChild(opt);
      });

      getInstallments(
          document.getElementById('paymentMethodId').value,
          document.getElementById('transactionAmount').value,
          issuerSelect.value
      );
  } else {
      alert(`issuers method info error: ${response}`);
  }
}

function getInstallments(paymentMethodId, transactionAmount, issuerId){
  window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(transactionAmount),
      "issuer_id": parseInt(issuerId)
  }, setInstallments);
}

function setInstallments(status, response){
  if (status == 200) {
      document.getElementById('installments').options.length = 0;
      response[0].payer_costs.forEach( payerCost => {
          let opt = document.createElement('option');
          opt.text = payerCost.recommended_message;
          opt.value = payerCost.installments;
          document.getElementById('installments').appendChild(opt);
      });
  } else {
      alert(`installments method info error: ${response}`);
  }
}

doSubmit = false;
document.getElementById('paymentForm').addEventListener('submit', getCardToken);
function getCardToken(event){
   event.preventDefault();
   if(!doSubmit){
       let $form = document.getElementById('paymentForm');
       window.Mercadopago.createToken($form, setCardTokenAndPay);
       return false;
   }
};

function setCardTokenAndPay(status, response) {
   if (status == 200 || status == 201) {
       let form = document.getElementById('paymentForm');
       let card = document.createElement('input');
       card.setAttribute('name', 'token');
       card.setAttribute('type', 'hidden');
       card.setAttribute('value', response.id);
       form.appendChild(card);
       doSubmit=true;
       form.submit();
   } else {
       alert("Verify filled data!\n"+JSON.stringify(response, null, 4));
   }
};



// Fin MP


function mostrarMail(){
  let mail = document.getElementById('newsletter').value;
  console.log(mail);

  let enviar = document.getElementById('enviar');
  enviar.innerHTML = "Enviado";
}


$("#tituloProducto").hover(function(){
  $(this).css ("color", "green");
},
function(){
  $(this).css("color", "black");
});


$("#detailsP").hover(function(){
  $(this).css ("background", "green");
  $(this).css ("color", "white");
},

function(){
  $(this).css("background", "white");
  $(this).css ("color", "red");
});

//FILTRO INFANTIL
var cuadrosInfantiles = baseDeDatos.filter(filtroInfantil);
function filtroInfantil (value){
  return value.tipo === 'infantil';
}
  document.getElementById ("tipoInfantil").innerHTML= (cuadrosInfantiles);



// class Producto {
//   constructor (
//   nombreProducto,
//   precioProducto,
//   stockProducto,
//   personalizarProducto,
//   imagenProducto,
//   detalleProducto,
//   tipoProducto,
//   ){
//   this.nombre=nombreProducto;
//   this.precio=precioProducto;
//   this.stock=stockProducto;
//   this.personalizar=personalizarProducto;
//   this.imagen=imagenProducto;
//   this.detalle=detalleProducto;
//   this.tipo=tipoProducto;
//   }

//   viewProductos (){
//     document.getElementById ("carrito").innerHTML = ` 
//     <div>
//     <h2> ${this.nombre}</h2>
//     <p> ${this.precio} </p>
//     <p> ${this.stock} </p>
//     <p> ${this.personalizar} </p>
//     <p> ${this.detalle} </p>
//     <p> ${this.tipo} </p>
//     </div>
//     `;
//   }  
// }

//     let productoUno=new Producto ("Cuadro set Pastel", 2700, 11, "Personalizable", "https://i.ibb.co/GxBM446/cuadro-Set-pastel-Lovers.png", "Este combo incluye 6 cuadros: 2 de 30x40cm, 2 de 20x30cm y 2 de 15x21cm. ¡Se entrega listo para colgar! Láminas montadas en bastidores de 9mm");
//     let productoDos=new Producto ("Cuadro set Aqua Home", 2400, 9, "Personalizable", "https://i.ibb.co/b3Z25zX/cuadro-Set-aqua-Home.png", "El combo incluye 2 cuadros 30x40cm, 2 20x30cm y 2 15x21cm. ¡Ideal para decorar cualquier ambiente! Láminas montadas sobre bastidores de 9mm de profundidad.");
//     let productoTres=new Producto ("Cuadro set Travel Black", 2850, 8, "Personalizable", "https://i.ibb.co/p3HY4dn/cuadro-Set-travel-Black.png", "El combo incluye 2 cuadros 30x40cm, 2 20x30cm y 2 15x21cm. ¡Ideal para decorar cualquier ambiente! Láminas montadas sobre bastidores de 9mm de profundidad.");
//     let productoCuatro=new Producto ("Cuadro Lunas", 250, 9, "No personalizable", "https://i.ibb.co/h1TThh8/cuadro-Lunas.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoCinco=new Producto ("Cuadro Dreams", 250, 9, "No personalizable", "https://i.ibb.co/nC4FbK3/cuadro-Dreams.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoSeis=new Producto ("Cuadro Mapas", 400, 9, "No personalizable", "https://i.ibb.co/Cb0sBnf/cuadro-Mapas-Ilustracion.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoSiete=new Producto ("Díptico Rainbow", 840, 9, "Personalizable", "https://i.ibb.co/Wpj7JH7/cuadro-Dipticos-rainbow.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoOcho=new Producto ("Tríptico Geométrico", 750, 25, "Personalizable", "https://i.ibb.co/XYPNgJf/cuadro-Tripticos-Geometrico.png", "El combo incluye tres cuadros. Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoNueve=new Producto ("Tríptico Planisferio", 1200, 19, "No personalizable", "https://i.ibb.co/qjQB5jt/cuadro-Tripticos-Planisferio.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoDiez=new Producto ("Tríptico Ríe Vive Ama", 1200, 7, "Personalizable", "https://i.ibb.co/p4bjcpT/cuadro-Vive-Rie-Ama.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoOnce=new Producto ("Tríptico Heart", 1200, 4, "Personalizable", "https://i.ibb.co/521JBdr/cuadro-Tripticos-heart.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//     let productoDoce=new Producto ("Set Home", 850, 0, "No personalizable", "https://i.ibb.co/FzjLtJQ/cuadro-home.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.");
//   // CUADROS INFANTILES  
//     let productoTrece=new Producto ("Set Infantil Dinosaurios", 950, 5, "No personalizable", "https://i.ibb.co/5vGWQ0F/cuadro-Set-Infantil-Dinosaurios.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoCatorce=new Producto ("Cuadro Infantil León", 550, 20, "No personalizable", "https://i.ibb.co/v35dZqT/cuadro-infantil-leon.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoQuince=new Producto ("Cuadro Infantil Nacimiento", 350, 15, "Personalizable", "https://i.ibb.co/cyxWVPN/cuadro-infantil-oso.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");  
//     let productoDieciseis=new Producto ("Tríptico Infantil Principito", 1200, 15, "No personalizable", "https://i.ibb.co/g9hdJsQ/cuadro-infantil-principito.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoDiecisiete=new Producto ("Set Infantil Animales", 750, 15, "Personalizable", "https://i.ibb.co/TTg6GB9/cuadro-infantil-set-animales.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoDieciocho=new Producto ("Tríptico Infantil B&W", 750, 15, "Personalizable", "https://i.ibb.co/yXY0CLY/cuadro-infantil-triptico-bn.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoDiecinueve=new Producto ("Tríptico Infantil Selva", 750, 15, "Personalizable", "https://i.ibb.co/Vgth7sC/cuadro-infantil-triptico-ciervo.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil"); 
//     let productoVeinte=new Producto ("Tríptico Infantil Colores", 750, 15, "Personalizable", "https://i.ibb.co/MS3YYN5/cuadro-infantil-triptico-colors.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
//     let productoVeintiuno=new Producto ("Tríptico Infantil Selva II", 750, 15, "Personalizable", "https://i.ibb.co/tP86mGr/cuadro-infantil-triptico-selva.png", "Láminas montadas en bastidores de 9mm. Ideal para cualquier rincón del hogar.", "infantil");
    
//     const listaProductos = [];
//     listaProductos.push (productoUno, productoDos, productoTres,productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho, productoNueve, productoDiez, productoOnce, productoDoce, productoTrece, productoCatorce, productoQuince,productoDieciseis, productoDiecisiete, productoDieciocho, productoDiecinueve, productoVeinte, productoVeintiuno);


//     let cards = ``
//     for (let i=0; i<listaProductos.length; i++){
//       if (listaProductos[i].stock>0){
//     cards +=`
//       <div class="" id="listaDeProductos${i}"> 
//         <div class="col mb-4">
//           <div class="card h-100">
//             <img src=${listaProductos[i].imagen} class="card-img-top" width="350px" height="370px">
//             <div class="card-body">
//               <h5 class="card-title">
//                 <a href="../assets/productos.html" id="nombreDeProducto${i}"> ${listaProductos[i].nombre} </a>
//               </h5>
//               <p class="card-text"> $${listaProductos[i].precio}</p>
//               <p class="card-text">Stock: ${listaProductos[i].stock}</p>
//               <p class="card-text">${listaProductos[i].personalizar}</p>
//             </div>
//             <div id="detallesProductos${i}" class="row-cols-md-1">
//                 <button type="button" class="btn btn-sm btn-outline-danger col-1 mx-auto" data-toggle="modal" data-target="#itemDetalle" id="detailsP${i}">
//                    Detalle del producto 
//                 </button>
//             </div>

//             <div class="modal " tabindex="-1" id="itemDetalle${i}">
//             <div class="modal-dialog">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title"> ${listaProductos[i].nombre} </h5>
//                 <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">&times;</button>
//               </div>
//               <div class="modal-body">
//                 <p>${listaProductos[i].detalle}</p>
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(listaProductos[i])})'>
//                    Añadir al carrito
//                 </button>
//               </div>
//             </div>
//           </div>
//           </div>

//           <div class="card-footer row-cols-md-1">
//                 <button type="button" class="btn btn-secondary col-2 mx-auto" onclick='agregarAlCarrito(${JSON.stringify(listaProductos[i])})'>
//                     Añadir al carrito
//                 </button>
//           </div>
//           </div>
//         </div>
//       </div>
//       `;
//       }
//       else if (listaProductos[i].stock===0){
//         cards += `
//         <div class="" id="listaDeProductos${i}"> 
//         <div class="col mb-4">
//           <div class="card h-100">
//             <img src=${listaProductos[i].imagen} class="card-img-top" width="350px" height="370px">
//             <div class="card-body">
//               <h5 class="card-title">
//                 <a href="#"> ${listaProductos[i].nombre} </a>
//               </h5>
//               <p class="card-text"> $${listaProductos[i].precio}</p>
//               <p class="card-text">Stock: ${listaProductos[i].stock}</p>
//               <p class="card-text">${listaProductos[i].personalizar}</p>
//             </div>
//             <div id="detallesProductos${i}" class="row-cols-md-1">
//               <button type="button" class="btn btn-sm btn-outline-danger col-1 mx-auto " data-toggle="modal" data-target="#itemDetalle" id="detailsP${i}">
//               Detalle del producto 
//               </button>
//             </div>


//             <div class="modal" tabindex="-1" id="itemDetalle">
//             <div class="modal-dialog">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 id="tituloProducto${i}" class="modal-title"> ${listaProductos[i].nombre} </h5>
//                 <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">&times;</button>
//               </div>
//               <div class="modal-body">
//                 <p>${listaProductos[i].detalle}</p>
//               </div>
//               <div class="modal-footer">
//                 <button type="button" class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(listaProductos[i])})'>
//                    Añadir al carrito
//                 </button>
//               </div>
//             </div>
//           </div>
//           </div>

//             <div class="card-footer row-cols-md-1">
//                 <button type="button" class="btn btn-secondary col-2 mx-auto" id="botonCarrito" >
//                     No hay stock
//                 </button>
//           </div>
//           </div>
//         </div>
//       </div>
//       `} 
//   }

// document.getElementById ("productos").innerHTML= cards;
//  $("#productos").html(cards);

