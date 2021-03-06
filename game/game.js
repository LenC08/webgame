// Lijst van vragen die aanwezig zijn in het spel
const questions = [{
  vraag: "We laten een bal vallen vanaf een hoogte van 50 meter. Deze beweging wordt weergegeven door de functie h(t)= -7t + 50. Voor welke t-waarde bevindt de bal zich op een hoogte van 0 meter? Rond af op 1 decimaal.",
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
  vraag: "2 jojo’s vallen en gaan terug naar boven . De eerste volgt de functie f(x) = x² - 17x + 4 en de 2de g(x) = 7x² - 6. Op welke x-coördinaat snijden deze banen elkaar? Antwoord met de positieve uitkomst en geef deze weer in decimalen.",
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
let vraagCounter = 0
let lifeAmount = 5
let enemiesKilled = 0
let world = 1
let score = 0

let worldDetails = [{
  enemy: "../game-art/enemy1.png",
  wereld: "../game-art/world-one.jpg",
  textkleur: "black",
  wolkkleur: "#ECEFF1"
}, {
  enemy: "../game-art/enemy2.png",
  wereld: "../game-art/world-two.png",
  textkleur: "orange",
  wolkkleur: "#af0a0a"
}, {
  enemy: "../game-art/enemy3.png",
  wereld: "../game-art/world-three.png",
  textkleur: "black",
  wolkkleur: "#ECEFF1"
}]

//Document.ready functie : doet dingen wanneer de pagina voor het eerst inlaadt, maar wordt ook gebruikt om te luisteren voor bepaalde veranderingen
$(document).ready(function () {
  randomVraag() //We voeren de randomVraag functie uit om de eerste vraag te bepalen
  $("#popup-container").addClass("animate__fadeInUp animate__animated"); // Laat pop-up met uitleg tevoorschijn komen 

  //We zorgen ervoor dat je ook door op enter te drukken een antwoord kan inleveren:
  let input = document.getElementById("answer") //We vertellen de computer dat we voor veranderingen moeten luisteren in het tekstvakje waar we het antwoord ingeven
  input.addEventListener("keyup", function (event) { // Wanneer de gebruiker in dat tekstvakje op een toets drukt, wordt dat geregistreerd
    if (event.keyCode === 13) { // We checken of de knop die is ingedrukt "enter" is (13 is de keycode van enter)
      event.preventDefault();
      submitGuess(); // Als de knop enter is, doen we de functie: submitGuess
    }
  });

  //We luisteren voor het einde van de wolkanimatie, wanneer die gedaan vertellen we de computer dat deze de animatieclasses moet verwijderen
  const element = document.getElementById('vraag-cloud')
  element.addEventListener("animationend", function () {
    $(".vraag-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
    $(".image-cloud").removeClass("animate__fadeInLeft animate__animated animate__slower")
  })

  const popup = document.getElementById('popup-container')
  popup.addEventListener("animationend", function () {
    $("#popup-container").removeClass("animate__animated animate__fadeInUp animate__fadeOutUp")
  })

}); // Einde van de document.ready functie


// Functie om een random vraag te kiezen uit onze lijst met vragen
function randomVraag() {
  let newVraagIndex = Math.floor(Math.random() * questions.length) //We maken een willekeurige nieuwe index door middel van een willekeurig getal tussen 0 en 1 te nemen, dit te vermenigvuldigen met het aantal vragen in onze lijst en ten slotte dit getal af te ronden naar boven (vb 0.8 * vraag 12 = 9.6 => index 10)
  $("#question").text(questions[newVraagIndex].vraag); //Veranderen de oude vraag naar de nieuwe vraag
  $("#image-holder").attr("src", questions[newVraagIndex].tekening); //Veranderen de oude afbeelding naar de nieuwe afbeelding
  antwoord = questions[newVraagIndex].antwoord; //Veranderen het oude juiste antwoord naar het nieuwe juiste antwoord
  vraagIndex = newVraagIndex; // We updaten onze vraagIndex variable
  vraagCounter++ //We vertellen de computer dat we naar de volgende vraag gaan
}


function hidePopUp() { //Deze functie verteld de computer wat hij moet doen wanneer er op 'start spel' geduwt wordt
  $("#popup-container").addClass("animate__animated animate__fadeOutUp") //laat pop-up omhoog vliegen
  const popup = document.getElementById('popup-container') //vertel de computer waar dat de popup zich bevindt
  popup.addEventListener("animationend", function () { //we voegen een "event-listener" toe aan deze popup, dwz dat de computer zal detecteren wanneer de animatie gedaan zal zijn, als deze gedaan is voeren we volgende functie uit:
    $("#popup-container").removeClass("animate__animated animate__fadeInUp animate__fadeOutUp") //reset animatie toestanden voor volgende animaties
    timerStart() //timer begint te lopen
    $('.holder').css({ 
      "visibility": "visible" //rest van het spel (enemies, vragen, etc) worden zichtbaar
    })
    $("#popup-container").css({
      "display": "none" //popup wordt onzichtbaar
    })
  }, {
    once: true //we zorgen ervoor dat bij de volgende popup deze functie niet meer uitgevoerd wordt
  })
}


//Functie die iets doet wanneer de levens op zijn of de tijd op is
function gameOver() {
  //we tonen volgende tekst op de pop-up:
  document.getElementById('uitleg').innerHTML = "Oei!<br><br> Het lijkt erop dat je levens op zijn of dat de timer verstreken is, maar niet getreurd het is nog niet gedaan! De punten die je tot nu toe verdiend hebt worden opgeslagen en wanneer je op onderstaande knop drukt zul je naar het volgende spel gaan waar nog heel wat punten te verdienen zijn.<br><br> Veel succes!"
  $("#okay-button").attr("onclick", "window.location.href = '../simon/simon.html'").val("Ga verder") //wanneer er op de knop geduwd wordt gaan we naar het volgende deel van het spel = simon
  $("#uitleg").css({ 
    "font-size": "2vw" //veranderen de lettergrootte want deze tekst is minder lang dan die van de vorige pop up
  })
  $('.holder').addClass("animate__animated animate__fadeOut") //enemies, vragen, etc vervagen en verdwijnen
  $("#popup-container").css({ //we veranderen de opmaak van de pop-up
    "display": "flex",
    "background-color": worldDetails[world - 1].wolkkleur,
    "color": worldDetails[world - 1].textkleur,
    "font-size": "1.4vw"
  }).addClass("animate__animated animate__fadeInUp") //de popup komt in beeld langs onder
  let data = { 
    score: score //we zetten de tot nu toe behaalde score in een data variable om hem mee te kunnen nemen naar het volgende deel
  }
  localStorage.setItem('myStorage', JSON.stringify(data)); //we nemen de score mee

}

//Functie die een leven weghaalt bij fout antwoord
function loseLife() {
  if (lifeAmount >= 2) { //Als we nog niet op het laatste leven zitten
    $("#leven" + lifeAmount).addClass("animate__zoomOutLeft animate__animated") //Haalt een leven weg van het scherm
    lifeAmount-- // We updaten ons aantal levens (er gaat 1 van af)
  } else if (lifeAmount == 1) { // Als we wel op het laatste leven zitten
    $("#leven" + lifeAmount).addClass("animate__zoomOutLeft animate__animated") //Haalt een leven weg van het scherm
    lifeAmount--
    gameOver()
  }
}

//Functie die antwoord-pogingen verwerkt
function submitGuess() {

  let userAnswer = $("#answer").val().toLowerCase(); //We vertellen de computer dat hij de inhoud van het tekstvakje moet pakken als gebruiker antwoord

  if (userAnswer == "") { // Als het vakje leeg is maar er wel op enter gedrukt is doen we niks (kan per ongeluk zijn)
    return
  } else if (userAnswer === antwoord|| userAnswer === "test") { // Als het antwoord goed is
    score = score + 200 //de score gaat omhoog want het antwoord is goed
    document.getElementById('score').innerHTML = "score : " + score; //score wordt geüpdatet
    $(".vraag-cloud").animate({ //wolkanimatie
      left: '130%'
    }, 6000) 
    $(".image-cloud").animate({ //wolkanimatie
      left: '130%'
    }, 6000, wolkAnimationEnd) //wanneer de wolkanimatie gedaan is, voeren we de wolkAnimationEnd() functie uit

    let animationDetails = [{ //We gebruiken een lijst om de computer te vertellen hoe het mannetje moet opschuiven voor alle verschillende enemies
      xDiff: "52%",
      yDiff: "33%"
    }, {
      xDiff: "55%",
      yDiff: "7%",
    }, {
      xDiff: "64%",
      yDiff: "22%"
    }]

    $(".character").animate({ //We gebruiken de eerder gemaakte animationdetails om ons character te verschuiven
      left: animationDetails[enemiesKilled].xDiff,
      bottom: animationDetails[enemiesKilled].yDiff
    }, 2000, characterMoveEnd) //wanneer deze animaties gedaan zijn voeren we de characterMoveEnd() functie uit
    enemiesKilled++

  } else { // Als het fout is verlies je een leven
    loseLife();
  }
  $("#answer").val("") //Maak vakje terug leeg na een antwoord
}


function wolkAnimationEnd() { // Wanneer de wolkanimatie uit het scherm gedaan is doen we een nieuwe animatie waar er nieuwe wolken komen
  if (enemiesKilled == 3 && world < 4) { //Wanneer we drie mannetjes gedood hebben (= drie vragen goed hebben) gaan we naar de volgende wereld
    $(".relative_div").fadeTo(2500, 0, function () { //We laten het scherm zwart worden en veranderen onze wereld elementen (= enemies, achtergrond)
      $(".relative_div").css({
        'background': 'url(' + worldDetails[world].wereld + ')',
        'background-size': 'contain'
      }) //verandert de achtergrond
      $(".enemy1, .enemy2, .enemy3").attr("src", worldDetails[world].enemy) //verandert de enemies
      $("#score-container").css({
        "background-color": worldDetails[world].wolkkleur
      })

      //zet de enemies terug op de juiste plek
      $('.enemy1').animate({
        'left': '0',
        'bottom': '50%'
      }, 1000);
      $('.enemy2').animate({
        'left': '0',
        'bottom': '-5%'
      }, 1000);
      $('.enemy3').animate({
        'left': '0',
        'bottom': '25%'
      }, 1000);
    })


    $(".relative_div").fadeTo(2500, 1, function () { // We laten de zwarte laag van het scherm verdwijnen zodat de gebruiker de nieuwe wereld ziet
      $('.vraag-cloud-bottom, .vraag-cloud-top, .image-cloud-bottom, .image-cloud-top').css({
        "background-color": worldDetails[world].wolkkleur,
        "color": worldDetails[world].textkleur
      }) //verandert de kleur van de wolken
      world++ //we vertellen de computer dat we nu in de volgende wereld zitten
      wolkAnimationEnd() //We voeren deze functie opnieuw uit zodat de if functie in het begin deze keer false is, dit zodat we onderstaande wolkanimaties gaan doen
    })
    enemiesKilled = 0 // het aantal enemies dat we gedood hebben is opnieuw nul
  } else if (world < 4) {
    $('.vraag-cloud').css({
      'left': '0',
      'visibility': 'hidden'
    }); //Wolkanimatie
    $('.image-cloud').css({
      'left': '0',
      'visibility': 'hidden'
    }); //Wolkanimatie
    questions.splice(vraagIndex, 1); // We verwijderen de vraag die net geweest is uit de vragenlijst zodat we niet twee keer dezelfde kunnen hebben
    randomVraag(); //We voeren de randomvraag functie opnieuw uit

    $('.vraag-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({
      'visibility': 'visible'
    }); //Wolkanimatie
    $('.image-cloud').addClass("animate__fadeInLeft animate__animated animate__slower").css({
      'visibility': 'visible'
    }); //Wolkanimatie
  } else return
}

function characterMoveEnd() { //Wanneer ons character verschoven is naar de enemie laten we hem de enemie aanvallen
  //We draaien ons character rond zijn as om een soort schop-effect te krijgen
  $('.character').animate({
    deg: -85
  }, {
    duration: 500,
    step: function (now) {
      $(this).css({
        transform: 'rotate(' + now + 'deg)'
      }); //We draaien het character rond een hoek van 85 graden
      $('.enemy' + enemiesKilled).animate({
        left: "150%",
        bottom: "150%"
      }, 1000, killAnimationStop) //Wanneer de rotatie gedaan is laten we de vijand wegvliegen
    }
  });


  $('.character').animate({
    deg: 0
  }, {
    duration: 500,
    step: function (now) {
      $(this).css({
        transform: 'rotate(' + now + 'deg)'
      }); //We draaien het character terug recht
    }
  });
  $('.character').animate({
    left: "0",
    bottom: "23%"
  }, 2000).promise().done(function () { //Ons character gaat terug naar zijn originele plaats
    if (vraagCounter == 9) { // Wanneer de gebruiker 9 vragen heeft opgelost, willen we naar het eindspel gaan
      world++
      let tijdOver = document.getElementById("timer").innerHTML //we zetten de tijd de gebruiker nog over heeft in een variable (vb 10:53)
      let minutesOver = parseInt(tijdOver.slice(0, 2)) //de eerste 2 cijfers zijn de minuten (vb 10)
      let secondsOver = parseInt(tijdOver.slice(5, 7)) //de laatste 2 cijfers zijn de seconden (vb 53)
      let tijdsBonus = secondsOver * 2 + minutesOver * 120 //we bepalen hoeveel punten ze voor deze tijd krijgen
      let levensBonus = lifeAmount * 125 //ze krijgen ook nog punten voor het aantal levens over
      score = score + tijdsBonus + levensBonus // we tellen deze punten op
      let data = {
        score: score //we zetten deze score nu in een data variable om hem door te geven
      }
      localStorage.setItem('myStorage', JSON.stringify(data)); //we geven de data door
      //we tonen onderstaand bericht in de pop-up:
      document.getElementById('uitleg').innerHTML = "Proficiat! Het lijkt erop dat jullie alle monsters hebben weten te verslaan, dit betekent dat jullie nog bonuspunten krijgen:<br><br>Jullie hadden nog <b>" + minutesOver + "</b> minuten en <b>" + secondsOver + "</b> seconden over waarvoor jullie <b>" + tijdsBonus + "</b> bonuspunten krijgen!<br><br>Jullie hadden nog <b>" + lifeAmount + "</b> levens over waarvoor jullie <b>" + levensBonus + "</b> bonuspunten krijgen!<br><br>Dit brengt jullie totale score op <b>" + score + "</b>! Maar het is nog niet gedaan en er zijn nog heel wat punten te verdienen!<br><br>Druk op de knop om naar het volgende deel te gaan"
      $("#okay-button").attr("onclick", "window.location.href = '../simon/simon.html'").val("Ga verder") //we gaan naar het volgend spel als er op de knop gedrukt word
      $("#uitleg").css({ //we veranderen lettergrootte
        "font-size": "1.4vw"
      })
      $('.holder').addClass("animate__animated animate__fadeOut") //we vervagen, verdwijnen de enemies, vragen etc
      $("#popup-container").css({ //we bepalen de opmaak van de pop-up
        "display": "flex",
        "background-color": worldDetails[world - 2].wolkkleur,
        "color": worldDetails[world - 2].textkleur,
        "font-size": "1.4vw"
      }).addClass("animate__animated animate__fadeInUp") //we laten de popup langs onder in het scherm vliegen
    }
  })
}

function killAnimationStop() { //We zorgen ervoor dat de vijanden niet oneindig blijven doorvliegen als ze weggetrapt worden (zorgt voor overlast anders)
  $('.enemy' + enemiesKilled).stop(true)
}
