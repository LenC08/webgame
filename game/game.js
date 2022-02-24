
// Lijst van vragen die aanwezig zijn in het spel
const questions = [{
  vraag: "We laten een bal vallen vanaf een hoogte van 50 meter. Deze beweging wordt weergegeven in de functie h(t)= -7t + 50. Voor welke t-waarde bevindt de bal zich op een hoogte van 0 meter? Rond af op 1 decimaal.",
  antwoord: "7,1",  
  tekening: "../game-art/oefening1.jpg"  
  }, {  
  vraag: "Gegeven een rechthoekige driehoek SAB. |AB| meet 9 cm, de tangens van hoek S is 3/2 en de rechte hoek ligt in punt A. Hoe lang is |SA|?",  
  antwoord: "6",  
  tekening: "../game-art/oefening2.jpg"  
  }, {  
  vraag: "Het lokaal A0.05 heeft een omtrek van 46 m en een oppervlakte van 112 m². Bereken de afmetingen en antwoord met de langste zijde.",  
  antwoord: "16",  
  tekening: "../game-art/oefening3.jpg"
  }, {  
  vraag: "De functie x(t) = 16t² wordt gebruikt om de afstand dat een voorwerp in vrije val aflegt in t seconden te bepalen. We gooien een boek van een gebouw en dit doet er 3,47 seconden over om de grond te raken. Hoe hoog is dit gebouw? Rond af op 2 decimalen.",  
  antwoord: "192,65",  
  tekening: "../game-art/oefening4.jpg"  
  }, {  
  vraag:"2 jojo’s vallen en gaan terug naar boven . De eerste volgt de functie f(x) = x² - 17x + 4 en de 2de g(x) = 7x² - 6. Op welke x-coördinaat snijden deze banen elkaar? Antwoord met de positieve uitkomst.",  
  antwoord: "0,5",
  tekening: "../game-art/oefening5.jpg"   
  }, {  
  vraag: "De som van een getal en het kwadraat van dat getal is 756. Bepaal dat getal. Het getal dat we zoeken is negatief.",  
  antwoord: "-28",
  tekening: "../game-art/oefening6.jpg"   
  }, {  
  vraag: "Mevrouw Thoelen wil een tuinhuis bouwen in de vorm van een balk met een rechthoek als grondvlak. De hoogte bedraagt 2,2 meter en de inhoud 51 m³. De som van de lengte, breedte en hoogte is 13,4 m. Bereken de lengte en geef je antwoord in op 2 decimalen.",  
  antwoord: "8,46",
  tekening: "../game-art/oefening7.jpg"  
  }, {  
  vraag: "We kijken naar een gebouw onder een hoek van 48°. De afstand tussen onszelf en de top van het gebouw is 63 meter. Bereken de hoogte van dat gebouw tot op 1 decimaal.",  
  antwoord: "46,8",
  tekening: "../game-art/oefening8.jpg" 
  }, {  
  vraag: "Bij de wafelverkoop op SAB worden er twee soorten wafels verkocht: vanillewafels (€4) en chocoladewafels (€5). In totaal worden er 74 wafels verkocht voor een totaalbedrag van 314 euro. Hoeveel vanillewafels worden er verkocht?",  
  antwoord: "56",
  tekening: "../game-art/oefening9.jpg"  
  }, {  
  vraag: "De som van de kwadraten van twee opeenvolgende getallen is 2813. De som van deze getallen is 75. Bepaal het eerste getal.",  
  antwoord: "37",
  tekening: "../game-art/oefening10.jpg"  
  }, {  
  vraag: "De afstanden tussen Bree, Meeuwen en Gruitrode vormen een rechthoekige driehoek BGM. De afstand van Gruitrode tot Bree is 6 km en de hoek B is 37° 28’. Bereken de afstand tussen Bree en Meeuwen tot op 0,1km nauwkeurig.",  
  antwoord: "7,6",
  tekening: "../game-art/oefening11.jpg"   
  }, {  
  vraag: "We vinden een piramide met een vierkant met diameter 14 als grondvlak. De hoek die de hoogte maakt met de ribbe van de piramide is 60°. Bereken x tot op 1 decimaal.",  
  antwoord: "8,1",
  tekening: "../game-art/oefening12.jpg"   
  }, {  
  vraag: "Welke van deze uitspraken is niet correct bij onderstaande figuur:\nA: B en P zijn niet gelijk\nB: K en F zijn niet gelijk\nC: A en G zijn niet gelijk\nD: F en N zijn niet gelijk",  
  antwoord: "A",
  tekening: "../game-art/oefening13.png"  
  }, {  
  vraag: "Bepaal de zijde van een vierkant dat dezelfde oppervlakte heeft als een cirkel met diameter 12 (tot op 1 decimaal)",  
  antwoord: "10,6",
  tekening: "../game-art/oefening14.jpeg"   
  }, {  
  vraag: "De score van een klas van 24 leerlingen op een toets van wiskunde wordt weergegeven in een grafiek. Bereken het verschil tussen de mediaan en het gemiddelde tot op 1 decimaal.",  
  antwoord: "0,7",
  tekening: "../game-art/oefening15.png"   
  }]

  // Enkele variablen die we nodig hebben
  let antwoord = ""
  let vraagIndex = ""
  let vraagCounter = 0;
  let lifeAmount = 5

//Document.ready functie : doet dingen wanneer de pagina voor het eerst inlaadt, maar wordt ook gebruikt om te luisteren voor bepaalde veranderingen
$(document).ready(function () {

  randomVraag() //We voeren de randomVraag functie uit om de eerste vraag te bepalen

  $("#popup").addClass("animate__fadeInUp"); // Laat pop-up met uitleg tevoorschijn komen 

  //We zorgen ervoor dat je ook door op enter te drukken een antwoord kan inleveren:
  let input = document.getElementById("answer") //We vertellen de computer dat we voor veranderingen moeten luisteren in het tekstvakje waar we het antwoord ingeven
    input.addEventListener("keyup", function(event) { // Wanneer de gebruiker in dat tekstvakje op een toets drukt, wordt dat geregistreerd
      if (event.keyCode === 13) { // We checken of de knop die is ingedrukt "enter" is (13 is de keycode van enter)
        event.preventDefault();
        submitGuess(); // Als de knop enter is, doen we de functie: submitGuess
      }
    });

//We luisteren voor het einde van de wolkanimatie, wanneer die gedaan vertellen we de computer dat deze de animatieclasses moet verwijderen
  const element = document.getElementById('vraag-cloud')
  element.addEventListener("animationend", function() {
    $(".vraag-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
    $(".image-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
  })

}); // Einde van de document.ready functie


 // Functie om een random vraag te kiezen uit onze lijst met vragen
function randomVraag() {
  if (vraagCounter == 5) { // Wanneer de gebruiker 5 vragen heeft opgelost, willen we naar het eindspel gaan
    window.location.href = "../simon/simon.html"
  } else { //Als dat niet zo is, stellen we de volgende vraag in
    let newVraagIndex = Math.floor(Math.random() * questions.length) //We maken een willekeurige nieuwe index door middel van een willekeurig getal tussen 0 en 1 te nemen, dit te vermenigvuldigen met het aantal vragen in onze lijst en ten slotte dit getal af te ronden naar boven (vb 0.8 * vraag 12 = 9.6 => index 10)
    $("#question").text(questions[newVraagIndex].vraag); //Veranderen de oude vraag naar de nieuwe vraag
    $("#image-holder").attr("src", questions[newVraagIndex].tekening); //Veranderen de oude afbeelding naar de nieuwe afbeelding
    antwoord = questions[newVraagIndex].antwoord; //Veranderen het oude juiste antwoord naar het nieuwe juiste antwoord
    vraagIndex = newVraagIndex; // We updaten onze vraagIndex variable
    vraagCounter++ //We vertellen de computer dat we naar de volgende vraag zijn
  }  
}

//doet de animaties na het verbergen van de popup (is nog niet echt geïmplementeerd nadat we de opmaak opnieuw waren begonnen)

function hidePopUp() {

  $("#popup-container").slideUp(1000, function () {
    $(".holder").css({ "visibility": "visible" })
    $("#uithangbord").addClass("animate__backInDown animate__animated")

    $(".uithangbord").one("animationend", () => {
      $("#char").css({ "visibility": "visible" })
      $("#char").addClass("animate__lightSpeedInLeft animate__animated")
      timerStart()
    });

  });
}


//Functie die iets doet wanneer de levens op zijn (nog niet af)
function gameOver() {
  $("body").remove();
}

//Functie die een leven weghaalt bij fout antwoord
function loseLife() {
  if (lifeAmount >= 2) { //Als we nog niet op het laatste leven zitten
    $("#leven" + lifeAmount).addClass("animate__zoomOutLeft animate__animated") //Haalt een leven weg van het scherm
    lifeAmount-- // We updaten ons aantal levens (er gaat 1 van af)
  } else if (lifeAmount == 1) { // Als we wel op het laatste leven zitten
    gameOver()
  }
}

//Functie die antwoord-pogingen verwerkt
function submitGuess() {

  let userAnswer = $("#answer").val().toLowerCase(); //We vertellen de computer dat hij de inhoud van het tekstvakje moet pakken als gebruiker antwoord

  if (userAnswer == "") { // Als het vakje leeg is maar er wel op enter gedrukt is doen we niks (kan per ongeluk zijn)
    return
  } else if (userAnswer === antwoord) { // Als het antwoord goed is
    $(".vraag-cloud").animate({right: '-40vw'}, 5000) //Wolkanimatie
    $(".image-cloud").animate({right: '-50vw'}, 5000, animationEnd) //Wolkanimatie
  } else { // Als het fout is verlies je een leven
    loseLife();
  }
  $("#answer").val("") //Maak vakje terug leeg na een antwoord

}


function animationEnd() { // Wanneer de wolkanimatie uit het scherm gedaan is doen we een nieuwe animatie waar er nieuwe wolken komen
  $('.vraag-cloud').css({'right' : '44vw', 'visibility':'hidden'}); //Wolkanimatie
  $('.image-cloud').css({'right' : '17vw', 'visibility':'hidden'}); //Wolkanimatie
  questions.splice(vraagIndex, 1); // We verwijderen de vraag die net geweest is uit de vragenlijst zodat we niet twee keer dezelfde kunnen hebben
  randomVraag(); //We voereb de randomvraag functie op niew uit
  
  $('.vraag-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({'visibility':'visible'}); //Wolkanimatie
  $('.image-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({'visibility':'visible'}); //Wolkanimatie
}









