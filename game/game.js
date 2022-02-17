
//array met vragen
const questions = [{
  vraag: "We laten een bal vallen vanaf een hoogte van 50 meter. Deze beweging wordt weergegeven in de functie h(t)= -7t + 50. Voor welke t-waarde bevindt de bal zich op een hoogte van 0 meter?",
  antwoord: "7,1",
  tekening: "https://imgur.com/AX2qs9n.jpeg"
}, {
  vraag: "Gegeven een rechthoekige driehoek S B. |AB| meet 9 cm,  de tangens van hoek S is 3/2 en de rechte hoek ligt in punt A. Hoe lang is |SA|?",
  antwoord: "6",
  tekening: "https://i.imgur.com/Sibt3MD.jpeg"
}, {
  vraag: "Het lokaal A0.05 heeft een omtrek van 46 m en een oppervlakte van 112 m². Bereken de afmetingen en antwoord met de langste zijde.",
  antwoord: "16",
  tekening: "https://i.imgur.com/TNpWntB.jpeg"
}, {
  vraag: "De functie x(t) = 16t² wordt gebruikt om de afstand dat een voorwerp in vrije val aflegt in t seconden te bepalen. We gooien een boek van een gebouw en dit doet er 3,47 seconden over om de grond te raken. Hoe hoog is dit gebouw? Rond af op 2 decimalen.",
  antwoord: "192,65",
  tekening: "https://i.imgur.com/ZfJBx6y.jpeg"
}, {
  vraag:"2 jojo’s vallen en gaan terug naar boven . De eerste volgt de functie f(x) = x² - 17x + 4 en de 2de g(x) = 7x² - 6. Op welke x-coördinaat  snijden deze banen elkaar? Antwoord met de positieve uitkomst.",
  antwoord: "0,5" 
}, {
  vraag: "De som van een getal en het kwadraat van dat getal is 756. Bepaal dat getal. Het getal dat we zoeken is negatief.",
  antwoord: "-28"
}, {
  vraag: "Mevrouw Thoelen wil een tuinhuis bouwen in de vorm van een balk met een rechthoek als grondvlak. De hoogte bedraagt 2,2 meter en de inhoud 51 m³. De som van de lengte, breedte en hoogte is 13,4 m. Bereken de lengte en geef je antwoord in op 2 decimalen.",
  antwoord: "8,46"
}, {
  vraag: "We kijken naar een gebouw onder een hoek van 48°. De afstand tussen onszelf en de top van het gebouw is 63 meter. Bereken de hoogte van dat gebouw tot op 1 decimaal.",
  antwoord: "46,8"
}, {
  vraag: "Bij de wafelverkoop op SAB worden er 2 soorten wafels verkocht: vanillewafels (€4) en chocoladewafels (€5). In totaal worden er 74 wafels verkocht voor een totaalbedrag van 314 euro. Hoeveel vanillewafels worden er verkocht?",
  antwoord: "56"
}, {
  vraag: "De som van de kwadraten van twee opeenvolgende getallen is 2813. De som van deze getallen is 75. Bepaal het eerste getal.",
  antwoord: "37"
}, {
  vraag: "De afstanden tussen Bree, Meeuwen en Gruitrode vormen een rechthoekige driehoek BGM. De afstand van Gruitrode tot Bree is 6 km en de hoek B is 37° 28’. Bereken de afstand tussen Bree en Meeuwen tot op 0,1km nauwkeurig.",
  antwoord: "7,6"
}, {
  vraag: "We vinden een piramide met een vierkant met diameter 14 als grondvlak. De hoek die de hoogte maakt met de ribbe van de piramide is 60°. Bereken X tot op 1 decimaal.",
  antwoord: "8,1"
}, {
  vraag: "Welke van deze uitspraken is niet correct bij onderstaande figuur:",
  antwoord: "A"
}]

//document ready functie (doet dingen wanneer de website inlaadt of dingen die je altijd wil laten luisteren voor veranderingen)
$(document).ready(function () {

  $("#question").text(questions[0].vraag);
  $("#popup").addClass("animate__fadeInUp");

//enter werkt
  let input = document.getElementById("answer")
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        submitGuess();
      }
    });

//luistert voor einde van animatie
  const element = document.getElementById('vraag-cloud')
  element.addEventListener("animationend", function() {
    $(".vraag-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
    $(".image-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
  })

});

//doet de animaties na het verbergen van de popup
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

function volgendeWereld() {

  $("#uithangbord").addClass("animate__backOutUp animate__slow")
  
}


// variables inleiden
let i = 0
let lifeAmount = 5

//functie die dingen doet als de levens op zijn
function gameOver() {
  $("body").remove();
}

//functie die een leven weghaalt bij fout antwoord
function loseLife() {
  if (lifeAmount >= 2) {
    $("#leven" + lifeAmount).addClass("animate__zoomOutLeft animate__animated")
    lifeAmount--
  } else if (lifeAmount == 1) {
    gameOver()
  }
}

//question handler

function submitGuess() {

  let answer = $("#answer").val().toLowerCase();
  console.log(answer)

  if (answer == "") {
    return
  } else if (answer === questions[i].antwoord) {
    $(".vraag-cloud").animate({right: '-40vw'}, 5000)
    $(".image-cloud").animate({right: '-50vw'}, 5000, animationEnd)
    
    i++
  } else {
    loseLife();
    console.log("fout!")
  }
  $("#answer").val("")

}


function animationEnd() {

  $('.vraag-cloud').css({'right' : '44vw', 'visibility':'hidden'});
  $('.image-cloud').css({'right' : '17vw', 'visibility':'hidden'});
  $("#question").text(questions[i + 1].vraag);
  $("#image-holder").attr("src", questions[i + 1].tekening);
  $('.vraag-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({'visibility':'visible'});
  $('.image-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({'visibility':'visible'});
}









