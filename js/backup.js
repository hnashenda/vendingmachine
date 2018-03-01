// Initialise all parameters




//Wechselgeld in Machine
var wechselGeld = 0;

var strWechselGeld;
var kosten;
var getränkeItem;

var genauesRestgeld = false;
isMünze= [];






//Bildschirmtext
var displayDefault = "<p>Insert Coins</p><p>$0.00</p>";
var displayDanke = "<p>THANK YOU</p>";
var nichtAkzeptieren = "<p>Cannot accept coin.</p>";
var genauWechseldGeld = "<p>Exact change only</p>";
var ausVerkauft = "<p>Insert Coins</p><p>$" + strWechselGeld + "</p>";

//Array von Münzen

var münzen = [{
  name: "nickel",
  weight: 5.0,
  diameter: 0.84,
  value: 0.05
}, {
  name: "dime",
  weight: 2.27,
  diameter: 0.7,
  value: 0.1
}, {
  name: "quarter",
  weight: 5.8,
  diameter: 0.96,
  value: 0.25
}];

//Getränke in Machine
var getränke = [ {
  name: "coke",
  cost: "1.00",
  inventory: 10
},
{
  name: "coke_light",
  cost: "0.50",
  inventory: 10
},
{
  name: "coke_zero",
  cost: "0.65",
  inventory: 10
}
,
{
  name: "coke_cherry",
  cost: "0.65",
  inventory: 10
}
,
{
  name: "fanta_grape",
  cost: "0.65",
  inventory: 10
}
,
{
  name: "fanta_orange",
  cost: "0.65",
  inventory: 10
}
,
{
  name: "cream_soda",
  cost: "0.65",
  inventory: 10
}
,
{
  name: "mountain_dew",
  cost: "0.65",
  inventory: 10
}
];



// Display

//Update display
function displayMessage(text) {
  $(".display").html(text);
}

//Resets Array von Münzen und Gewicht in eine Zahl unrechnen
function convertGewicht(value) {
    isMünze= [];
    var nummer = parseFloat(value);
    return nummer;
}


// Münzen  suchen

function suscheMünzen (gewicht) {
  for (var i =0; i < münzen.length; i++) {
    for (var prop in münzen[i]) {
    if (münzen[i][prop] === gewicht) {
		
      //Münze zum Array hinzufügen
      isMünze.push(gewicht);
	  
	  
      //Geld eingefügt
      var geld = münzen[i].value;
      updateWechselGeld(geld);
  
      var total = "<p>Insert Coins</p><p>$" + strWechselGeld + "</p>";
      //Append total to scree
      displayMessage(total);
      //add inserted coin to new isCoin array
      console.log(geld);
      console.log(wechselGeld);
      console.log(strWechselGeld);
    }  
   }
  }
}




















//Tracks current value of change in machine and converts to string
function updateWechselGeld(inserted) {
  //Add val of inserted coin to total amt inserted in machine
      wechselGeld += inserted;
      //Convert total to string w/ 2 decimals
      strWechselGeld = wechselGeld.toFixed(2);
}

//Checks to see if coin can be accepted, if not, updates screen
function coinNichtAkzeptieren(arrVal) {
   if (arrVal === undefined) {
    console.log("nicht akzeptieren");
    //Update screen
    displayMessage(nichtAkzeptieren);
    //Alert user to remove coin
    nehmenMünzen();
  }
}

//Checks to see if food exists, if does, assigns values to variables
function getränkeInStock(value) {
  for(var i = 0; i < getränke.length; i++) {
    
    var getränkeName = getränke[i].name;
    //var possFoodObj = foods[i];    
      //Checks to see if selection's value exists in foods array
      if (value === getränkeName) {
        console.log("exact match!");
        //Assigns cost 
        kosten = getränke[i].cost;
        //Assigns matching obj to variable
        getränkeItem = getränke[i];
        console.log(kosten);
    }
  }  
}


//Resets wechselGeld 
function resetWechselGeld() {
  return wechselGeld = 0;
}

function updateTotalGeld() {
  var zurückGeld= wechselGeld - kosten;
           strWechselGeld = zurückGeld.toFixed(2);
           console.log("current change:" + strWechselGeld);
}

//Informiere den Nutzer über das Geld

function kundenNachricht(strWechselGeld) {
  $(".display").append('<p class="change_message">Change: $' + strWechselGeld + '</p>');
}






//Actions for machine to take if return change button pressed
function wechselGeldAus() {
    //Update screen: THANKS
    displayMessage(displayDanke);
    //Tell user amount of change returned
    kundenNachricht(strWechselGeld);   
   //Send change to coin return
    nehmenMünzen();
    //Reset amount in machine
   resetWechselGeld();
 
}

//Actions for machine to take if item is sold
function verkaufen() {
   //Update screen: THANKS
  displayMessage(displayDanke);
  //Send item to collect area
  sammeln();
 //Update inventory
  updateGetränke();
}



























//Actions for machine to take if change inserted is less than item cost
function wenigGeld(kosten) {
    //If exact change required
     if (genauesRestgeld) {
      //Update screen: exact change
       displayMessage(genauWechseldGeld);
     } else if (getränkeItem.inventory === 0) {
        //Update screen: SOLD OUT
        displayMessage(ausVerkauft);
  } else {
    var price = '<p>PRICE</p><p>$' + kosten + '</p>';
    //Update screen: PRICE
   displayMessage(price);
  }
}

//Actions for machine to take if amount of change inserted = item cost
function genau(kosten) {
    //If item out of stock
    if (getränkeItem.inventory === 0) {
      //Update screen: SOLD OUT
      displayMessage(ausVerkauft);
    } else {
      verkaufen();
      //Update total change in machine
      resetWechselGeld();
      }
    }

//Actions machine takes if amount of change entered is more than item cost
function zuvielGeld(kosten) {
        //If exact change required
        if (genauesRestgeld) {
          //Update screen: Exact change
         displayMessage(genauWechseldGeld);
          //If item sold out
        } else if (getränkeItem.inventory === 0) { 
          //Update screen: SOLD OUT
          displayMessage(ausVerkauft);
          } else {
           verkaufen();
           //Update total
           updateTotalGeld();
          //Return change to user
          wechselGeldAus();   
         }
      
}
























//Subtracts item from inventory
function updateGetränke() {
  return getränkeItem.inventory -= 1;
}

//Alerts user to get coins from coin return
function nehmenMünzen () {
   $(".coin_return").html('<p class="cc">Collect Change</p>');
}


















//Function to activate collection of vending machine item
function sammeln() {
   //Send item to collect area
    $(".collect").html("<h3>Click here to collect item</h3>");
      //When collect area clicked
      $(".collect").click(function() {
        //Reset collect area
        $(".collect").html("");
        //Reset screen
        displayMessage(displayDefault);
  });
}
         










		 
//Keep track of money inserted
  //When coin button clicked
  $(".add_coin").click(function() {
    //Convert button value aka weight into number
	
	alert("hello");
    var val = $(this).val();
    var numWeight = convertGewicht(val);
    //Reset screen
    displayMessage(displayDefault);
  //Search coins array for value
    suscheMünzen(numWeight);
  //If a number was not pushed to array aka coin doesn't exist for machine
  coinNichtAkzeptieren(isMünze[0]); 
  console.log(isMünze);
});
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  //Select food item
  $(".selection").click(function() {
   //Assign button's value to valItem
    var valItem = $(this).val();
    console.log(valItem);
     //Check to see if food exists in machine
     getränkeInStock(valItem); 
     //If cost of item is less than amount inserted in machine   
     if (strWechselGeld < kosten) { wenigGeld(kosten);
     } else if (strWechselGeld === kosten) {
        genau(kosten);
     } else if (strWechselGeld > kosten) {
        zuvielGeld(kosten);
     }
   });

   
   
   
   
   
   
   
   
   
   
   
//When exact change button clicked
$(".exact_only").click(function() {
    //Exact change is needed
    genauesRestgeld = true;
});

//When change ok button clicked
$(".change_ok").click(function() {
  //No exact change is needed
  genauesRestgeld = false;
});

//When return change button is clicked
$(".return_button").click(function() {
  //Return change
  if (wechselGeld > 0) {
    wechselGeldAus();
  }
});

//When coin return screen clicked
$(".coin_return").click(function() {
  //Message returns to "Coin Return"
  $(this).html("<p>Coin Return</p>");
  //Resets screen
 displayMessage(displayDefault);
});







$(document).ready(function(){	

});





