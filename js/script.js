
$(document).ready(function(){	

// -------initialisiere alle Parameter
//Wechselgeld in Machine
var wechselGeld = 0;

var strWechselGeld;
var kosten;
var getränkeItem;

var genauesRestgeld = false;
isMünze= [];

//Bildschirmtext
var displayDefault = "<p>Münze Einwerfen</p><p>$0.00</p>";
var displayDanke = "<p>Vielen Dank</p>";
var nichtAkzeptieren = "<p>Niicht Akzeptierte Waehrung</p>";
var genauWechseldGeld = "<p>Exact change only</p>";
var ausVerkauft = "<p>Insert Coins</p><p>$" + strWechselGeld + "</p>";

//Array von Münzen
var münzen = [
/* {
  name: "1_cent",
  gewicht: 0.011,
  diameter: 0.7,
  value: 0.01
}
, {
  name: "2_cent",
  gewicht: 0.021,
  diameter: 0.7,
  value: 0.02
}
, {
  name: "5_cent",
  gewicht: 0.051,
  diameter: 0.7,
  value: 0.05
}
, {
  name: "10_cent",
  gewicht: 0.11,
  diameter: 0.7,
  value: 0.1
}
, */{
  name: "20_cent",
  gewicht: 0.21,
  diameter: 0.7,
  value: 0.2
}
, {
  name: "50_cent",
  gewicht: 0.51,
  diameter: 0.7,
  value: 0.5
}
, {
  name: "euro",
  gewicht: 1.01,
  diameter: 0.7,
  value: 1.0
}
, {
  name: "2_euro",
  gewicht: 2.01,
  diameter: 0.7,
  value: 2.0
}

];

//Getränke in Machine
var getränke = [ {
  name: "coke",
  cost: "1.20",
  inventory: 10
},
{
  name: "coke_light",
  cost: "1.30",
  inventory: 10
},
{
  name: "coke_zero",
  cost: "1.15",
  inventory: 10
}
,
{
  name: "coke_cherry",
  cost: "1.35",
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
  cost: "1.15",
  inventory: 10
}
,
{
  name: "cream_soda",
  cost: "1.15",
  inventory: 10
}
,
{
  name: "mountain_dew",
  cost: "1.25",
  inventory: 10
}

,
{
  name: "appletizer",
  cost: "2.15",
  inventory: 10
}
,
{
  name: "grapetizer",
  cost: "2.15",
  inventory: 10
}
,
{
  name: "dr_pepper",
  cost: "1.50",
  inventory: 10
}
,
{
  name: "pepsi",
  cost: "1.55",
  inventory: 10
}

];


// ----------Funktions

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

function sucheMünzen (gewicht) {
  for (var i =0; i < münzen.length; i++) {
    for (var prop in münzen[i]) {
    if (münzen[i][prop] === gewicht) {
		
      //Münze zum Array hinzufügen
      isMünze.push(gewicht);
	  	  
      //Geld eingefügt
      var geld = münzen[i].value;
	  
	 // alert(münzen[i].name);
	  
      updateWechselGeld(geld);
  
      var total = "<p>Münze einwerfen</p><p>$" + strWechselGeld + "</p>";
      
	  //Gesamt betrag
      displayMessage(total);
     
    }  
   }
  }
}

//verfolgt Münzen, die der Maschine hinzugefügt wurden
function updateWechselGeld(inserted) {
  //addieren Wert der Münzen
      wechselGeld += inserted;
      //In String konvertieren
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

//Reset wechselGeld 
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

//Aktion, wenn Wecksekgeld Taste gedrückt wird
function wechselGeldAus() {
    //Update display: Danke
    displayMessage(displayDanke);
    //Benutzer über Geld informieren
    kundenNachricht(strWechselGeld);   
   //Geld schicken nack Wechselgeld
    nehmenMünzen();
    //Reset Machine
   resetWechselGeld();
 
}

//Aktion, wenn das Getränk verkauft wird
function verkaufen() {
   //Update display: Danke
  displayMessage(displayDanke);
  
  sammeln();
 //Update Antal der Getränke
  updateGetränke();
}

//Aktion, wenn zu wenig Geld eingefügt wird
function wenigGeld(kosten) {	
	
    //genau Wechselgeld
     if (genauesRestgeld) {
      //Update display: wechselgeld
       displayMessage(genauWechseldGeld);
     } else if (getränkeItem.inventory === 0) {
        //Update display: Ausverkauft
        displayMessage(ausVerkauft);
  } else {
    var price = '<p>Kosten</p><p>$' + kosten + '</p>';
    //Update screen: Kosten
   displayMessage(price);
  }
}

//Aktion, wenn der korrekte Betrag eingegeben wurde
function genau(kosten) {
    //Wenn ausverkauft
    if (getränkeItem.inventory === 0) {
      //Update display: Ausverkauft
      displayMessage(ausVerkauft);
    } else {
      verkaufen();
      //Update total 
      resetWechselGeld();
      }
    }

//Aktion, wenn der korrekte Betrag eingegeben wurde
function zuvielGeld(kosten) {
        //IWenn genau wechselGeld
        if (genauesRestgeld) {
          //Update display: genau wechselgeld
         displayMessage(genauWechseldGeld);
          //Wenn ausverkauft
        } else if (getränkeItem.inventory === 0) { 
          //Update display: ausverkauft
          displayMessage(ausVerkauft);
          } else {
           verkaufen();
           //Update total
           updateTotalGeld();
          //Wechselgeld zurückgeben
          wechselGeldAus();   
         }
      
}

//Reduziere die Getränke

function updateGetränke() {
  return getränkeItem.inventory -= 1;
}

//warnt Benutzer, Münzen zu nehmen

function nehmenMünzen () {
   $(".coin_return").html('<p class="cc">Wechselgeld Entnehmen</p>');
}


//Sammeln Getränke von Machine 
function sammeln() {
   //Schick an den Sammelbereich
    $(".collect").html("<h3>Click here to collect item</h3>");      
      $(".collect").click(function() {
        //Reset Sammelbereich
        $(".collect").html("");
        //Reset display
        displayMessage(displayDefault);
  });
}
         
 
  //Wähle ein Getränk
  $(".selection").click(function() {
   //Geben Sie einer Variablen der Wert der Button
   // var valItem = $(this).val();
	var valItem = $(this).attr("data-id")
	//alert(valItem );
    console.log(valItem);	
	//Überprüfen Sie die Lagerbestände   
     getränkeInStock(valItem); 
     //Wenn der Preis niedriger ist, dann wird Geld eingefügt
     if (strWechselGeld < kosten) { wenigGeld(kosten);
     } else if (strWechselGeld === kosten) {
        genau(kosten);
     } else if (strWechselGeld > kosten) {
        zuvielGeld(kosten);
     }
   });

		 
//Klicken Sie auf die Münze

  $(".add_coin").click(function() {
    //Konvertieren gewicht in einem Nummer

    var val = $(this).val();	
	
	var valCoin = $(this).attr("data-value")	
	
	//alert("the first"+val +" the second "+valCoin);
	
    var numWeight = convertGewicht(valCoin);
    //Reset display
    displayMessage(displayDefault);
  //Suchen einer Münze
    sucheMünzen(numWeight);
  //Bie Nicht Akzeptierter Waehrung
  coinNichtAkzeptieren(isMünze[0]); 
  
});
    
   
//Bei Genau Wechselgeld klicken
$(".exact_only").click(function() {
    //
    genauesRestgeld = true;
});

//Bei Change Wechselgeld klicken
$(".change_ok").click(function() {
  //brauchen nicht genaues Wechselgeld
  genauesRestgeld = false;
});

//Bei Wechselgeld zuruck klicken
$(".return_button").click(function() {
 
  if (wechselGeld > 0) {
    wechselGeldAus();
  }
});

//Bei Genau Geld zuruck klicken
$(".coin_return").click(function() {
 
  $(this).html("<p>Geld Zuruck</p>");
  //Resets screen
 displayMessage(displayDefault);
});




});










