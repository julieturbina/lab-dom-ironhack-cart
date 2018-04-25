

function createNewItem(){
  var Product = document.getElementById('addProduct').value;
  var cost = document.getElementById('addCost').value;
  var container = document.getElementById('newWrapper');
  console.log(container);

  var newWrapper = document.createElement('div');
  newWrapper.setAttribute("class", "wrapper");
  newWrapper.innerHTML =
<div id="product"><span>${Product}</span></div>
<div id="cost">$<span>${cost}</span></div>
<div id="units">
<label for="">QTY</label>
<input id="units" type="number" value="0">
</div>
<div id="total">$<span>0</span></div>
<div id="delete"><button class="btn btn-delete" id="deletePrices" class="delete">Delete</button></div>
}



{/* // =======================// */}

container.appendChild(newWrapper);{
}
window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');


// Calculate total price
    

calculatePriceButton.onclick = getTotalPrice;
//  createItemButton.onclick = createNewItem;

 for(var i = 0; i<deleteButtons.length; i++){
deleteButtons[i].onclick = deleteItem;
 }

function calculateprices() {
 // var value = units.value * price;
values = [];
 total.innerHTML = units.value * price;
// test.innerHTML = units.value * price;
console.log(total);

// 

var productsInCart=[
  
      {
      productNr: 1,
      productPrice: 25,
      units: 1
      },
  
      {
      productNr: 2,
      productPrice: 41,
      units: 1
      }
  ]

  var allMyProductNrs = [1,2,3,4,5];
  
  var products=[
       {
productNr: 1,
productName: "IronBubble-head",
productPrice: 25,
  
          },
          {
            productNr: 2,
            productName: "Iron Shirt",
            productPrice: 15,
  
          },

          {
            productNr: 3,
            productName: "Iron Cup",
            productPrice: 10
          },
          {
            productNr: 4,
            productName: "Iron Sticker",
            productPrice: 1
          },
          {
            productNr: 5,
            productName: "Iron Axe",
            productPrice: 100
       }
]
  
  function deleteItem(e){
    var ocurringButton=e.target;
    var itemID=ocurringButton.dataset.button;
    var currentItemId = "item" + itemID;
    var elementToHide = document.getElementById(currentItemId);
    elementToHide.style.display = "none";
    for(i=0; i<productsInCart.length; i++){
      if(productsInCart[i].productNr==itemID){
        productsInCart.splice([i], 1);
  
      }
    }
  }
  
function getTotalPrice(); {
  var units=1;
  var totalPrice=0;
    for (i=0; i<productsInCart.length; i++){
      units=productsInCart[i].units;
      totalItemsPrice = productsInCart[i].productPrice * units;
      totalPrice += totalItemsPrice;
}
  updateTotalPrice(totalPrice);
  
  }
  
function updateTotalPrice(totalPrice){
totalPrice += "$";
$("#totalprice").text(totalPrice);
}

function createNewItem(event, clonePrototype){
  
$('#error-message-NAN, #error-message').hide();
var input=event.target.value;
var myid=event.target.id;
var newproductname=document.getElementById('input-productname').value;
var newproductprice=document.getElementById('input-price').value;
if((newproductname!="") && (newproductprice!="")){
   //CHECK FOR UMBERS in second INPUT
var regex=/^[0-9]+$/;

if(!newproductprice.match(regex)){  
$('#error-message-NAN').show();
}

else{
allMyProductNrs.sort(function(a, b) {
return a - b;
});

        var newProductNr=allMyProductNrs[allMyProductNrs.length-1] + 1;
        //STORE NEW PRODUCT AND PROPERTIES TO KEEP TRACK //
        var product = { productName: newproductname, productPrice: newproductprice, productNr: newProductNr };
        var productInCart = { productPrice: newproductprice, productNr: newProductNr, units: 1 };
        productsInCart.push(productInCart);
        products.push(product);
        allMyProductNrs.push(newProductNr);
        var newItemId = "item" + newProductNr;
        var allItemRows = document.getElementsByClassName("item-row");
        var lastItemRow = allItemRows[allItemRows.length -1];
        var lastItemId  = lastItemRow.id;
        // CLONE PROTOTYPE, ASSIGN NEW PRODUCT ID TO AVOID DUBPLICATES//
        var newItem = clonePrototype.clone().attr('id', newItemId).addClass('row');
        newItem.insertAfter(  $("#" + lastItemId) );
        $('#' + newItemId +' .productname').text( newproductname );
        $('#' + newItemId +' .productprice').text( newproductprice + "$" );
        //CLONE PROTOTYPE -> MATCH PRODUCTDATA//
        $('#' + newItemId +' .btn-delete').attr("data-button", newProductNr);
        $('#' + newItemId +' input').attr("data-productnr", newProductNr);
        $('#' + newItemId +' input').attr({ id : "input-item" + newProductNr, value : 1, prop:1 });
        $('#' + newItemId +' input').val( 1 );
        $('#' + newItemId +' #totalProduct1').attr("id", "totalProduct" + newProductNr);
        $('#' + newItemId +' #totalProduct' + newProductNr).text( "");
        $('#error-message').hide();
        addEventListenersToDeleteButtons();
        addEventListenersToInputs();
      }
    }
   
else{
$('#error-message').show();
}

function updateItemAllUnitsPrice(units, ocurringProductNr){

for( i=0; i<productsInCart.length; i++ ){
if(productsInCart[i].productNr == ocurringProductNr){
productsInCart[i].units = units;
ocurringProductPrice = productsInCart[i].productPrice;
var itemPriceAllUnits = (ocurringProductPrice * units) + " $";
var elementTotalProductPrice = "totalProduct" + ocurringProductNr;
elementTotalProductPrice = document.getElementById(elementTotalProductPrice);
elementTotalProductPrice.innerHTML = itemPriceAllUnits;

  }

  }

}
  
function addEventListenersToInputs(){
    var updateQuantity= document.getElementsByTagName("input");
    for(i=0; i < updateQuantity.length; i++){
      updateQuantity[i].addEventListener("keyup", function(event){
            if (event.target.className=="units"){
              var ocurringProductNr = this.dataset.productnr;
              var units=event.target.value;
              updateItemAllUnitsPrice(units, ocurringProductNr);
            }
            else {
                return;
            }
       });
    }
  }
  
  function addEventListenersToDeleteButtons(){
  
    var deleteButtons = document.getElementsByClassName('btn-delete');
    for (j=0; j<deleteButtons.length; j++){
      deleteButtons[j].addEventListener("click", function(event){
        deleteItem(event);
    });
    }
  }
  
  window.onload = function(){

    // GET "ORIGINAL" BASE PROTOTYPE ITEM AND STORE ITS CLONE BEFORE DELETED//
    var clonePrototype = $('#item1').clone();
    var calculatePriceButton = document.getElementById('calc-prices-button');
    var createItemButton = document.getElementById('btn-createitem');
    createItemButton.addEventListener("click", function(event){
      createNewItem(event, clonePrototype);
     });
  
    calculatePriceButton.onclick = getTotalPrice;
    addEventListenersToInputs();
    addEventListenersToDeleteButtons();
  };
  