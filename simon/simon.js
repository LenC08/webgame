  //Enkele variablen die we nodig hebben:
  let volgorde = []
  let userVolgorde = []
  let ronde = 1
  let level = 0
  let poging = 0
  const knopContainer = document.querySelector(".knopcontainer")
  const foutGeluid = document.querySelector(`[data-sound="fout"]`)

  $(document).ready(function () { //document ready functie (doet dingen wanneer de pagina voor het eerst inlaadt)
    $("#popup-container").addClass("animate__fadeInUp animate__animated"); //laat popup langs onder verschijnen
  })

  function hidePopUp() { //Deze functie verteld de computer wat hij moet doen wanneer er op 'start spel' geduwt wordt
    $("#popup-container").addClass("animate__animated animate__fadeOutUp") //laat pop-up omhoog vliegen
    const popup = document.getElementById('popup-container') //vertel de computer waar dat de popup zich bevindt
    popup.addEventListener("animationend", function () { //we voegen een "event-listener" toe aan deze popup, dwz dat de computer zal detecteren wanneer de animatie gedaan zal zijn, als deze gedaan is voeren we volgende functie uit:
      $("#popup-container").removeClass("animate__animated animate__fadeInUp animate__fadeOutUp") //reset animatie toestanden voor volgende animaties
      $('body>*').css({
        "visibility": "visible" //rest van het spel (enemies, vragen, etc) worden zichtbaar
      })
      $("#popup-container").css({
        "display": "none" //popup wordt onzichtbaar
      })
    }, {
      once: true //we zorgen ervoor dat bij de volgende popup deze functie niet meer uitgevoerd wordt
    })
  }

  function gameEnd() { //functie wanneer het spel gedaan is (= wanneer 3 rondes gespeeld zijn)
    let totaal = parseInt(document.getElementById('ronde1').innerHTML) + parseInt(document.getElementById('ronde2').innerHTML) + parseInt(document.getElementById('ronde3').innerHTML) //we tellen de resultaten van de 3 rondes op
    let simonPunten = totaal * 15 //we zetten deze scores om in punten
    let data = JSON.parse(localStorage.getItem('myStorage')); //we halen de punten van het vorige deel uit de opgeslage data
    let scoreDeel1 = data.score //we zetten deze data in een scoreDeel1 variable
    score = simonPunten + scoreDeel1 //we berekenen de totale score
    //we tonen volgend bericht in de popup:
    document.getElementById('uitleg').innerHTML = "Proficiat! Met dit spel hebben jullie <b>" + simonPunten + "</b> extra punten verdient. Dit brengt jullie op een totaal van <b>" + score + "</b> punten! Nu is het tijd om jullie resultaat in te dienen, verzin nog snel een teamnaam en geef je score door aan een van de begeleiders.<br><br>Bedankt om mee te doen!"
    $("#okay-button").css({
      "display": "none" //we maken de knop onzichtbaar
    })
    $("#uitleg").css({
      "font-size": "2vw" //we veranderen lettergrootte
    })
    $('#levenscontainer, #rondeCounter, #startknop, .knopcontainer').addClass("animate__animated animate__fadeOut") //we vervagen, verdwijnen elementen van het spel
    $("#popup-container").css({ // we veranderen de opmaak van de popup
      "display": "flex"
    }).addClass("animate__animated animate__fadeInUp") //de popup komt langs onder het scherm in
  }

  function resetSpel() { //Functie wanneer je de foute kleur kiest
    foutGeluid.play() //Speel geluidje af wanneer het fout is
    document.getElementById("ronde" + poging).innerHTML = level //we updaten het ronde-nummer
    //We resetten het spel
    volgorde = []
    userVolgorde = []
    ronde = 0
    level = 0

    if (poging == 3) { //wanneer 3 keer geprobeerd is, eindigen we het spel
      gameEnd()
    }

    knopContainer.classList.add("onklikbaar") //Knopjes zijn niet klikbaar tot je terug op start duwt
    $("#startknop").css({
      "visibility": "visible"
    }) //Startknop is terug zichtbaar


  }

  function userBeurt(ronde) { //Knopjes kunnen terug ingeduwd worden
    knopContainer.classList.remove("onklikbaar")
  }

  function activeerKnop(color) { //Functie wanneer er een knop geactiveerd (= ingedrukt) wordt
    const knop = document.querySelector(`[data-knop="${color}"]`) //We vertellen de computer welke van de vijf knoppen dat het is
    const sound = document.querySelector(`[data-sound="${color}"]`) //We vertellen de computer welk geluidje er bij die knop hoort

    sound.play() //Speel het geluidje af van die knop
    knop.classList.add("geactiveerd") //Laat de knop "visueel" ingedrukt worden

    setTimeout(() => { //De knop blijft voor 0.3 seconden ingedrukt
      knop.classList.remove("geactiveerd")
    }, 300)
  }

  function speelVolgordeAf(volgendeVolgorde) { //Volgorde die de gebruiker moet herhalen wordt afgespeeld 
    volgendeVolgorde.forEach((color, index) => { //Elke knop uit de volgorde wordt om de beurt ingedrukt
      setTimeout(() => {
        activeerKnop(color)
      }, (index + 1) * 800 + 1000) //Je kunt niet op de knoppen duwen gedurende: aantal knoppen * 0.8 seconden + 1 seconden
    })
  }

  function volgendeStap() { //Functie om de volgende knop in de volgorde te bepalen
    const knoppen = ["roze", "groen", "blauw", "rood", "geel"]
    const randomKnop = knoppen[Math.floor(Math.random() * knoppen.length)] //We maken een willekeurige nieuwe knopindex door middel van een willekeurig getal tussen 0 en 1 te nemen, dit te vermenigvuldigen met het aantal knoppen in onze lijst en ten slotte dit getal af te ronden naar boven
    return randomKnop //De uitkomst output van deze functie is de gevonden willekeurige knop
  }

  function volgendeRonde() { // Functie wanneer we naar de volgende ronde gaan
    ronde++ // We updaten onze ronde-variable
    level++
    document.getElementById("rondeCounter").innerHTML = "ronde: <b>" + level + "</b>"
    knopContainer.classList.add("onklikbaar") //Knopjes onklikbaar

    const volgendeVolgorde = [...volgorde] //De nieuwe volgorde is de vorige volgorde + extra stap
    volgendeVolgorde.push(volgendeStap()) //We pushen de nieuwe stap bij de volgorde
    speelVolgordeAf(volgendeVolgorde) //We tonen de nieuwe volgorde aan de gebruiker

    volgorde = [...volgendeVolgorde] //Volgorde variable wordt geüpdate
    setTimeout(() => { //Knopjes worden terug klikbaar gemaakt
      userBeurt(ronde)
    }, ronde * 600 + 1000)
  }

  function handleClick(knop) { //Functie om gebruiker input te verwerken
    const index = userVolgorde.push(knop) - 1 //We updaten de index van de knop
    const sound = document.querySelector(`[data-sound="${knop}"]`); //Geluidje wordt aan knop gekoppeld
    sound.play() //Speel geluidje af

    const clicksLeft = volgorde.length - userVolgorde.length //We berekenen het aantal knopjes dat de gebruiker nog moet aantikken

    if (userVolgorde[index] !== volgorde[index]) { //Als de gebruiker de foute knop heeft
      resetSpel() //Reset het spel
      return
    }

    if (volgorde.length === userVolgorde.length) { //Als de gebruiker de juiste knop heeft
      userVolgorde = [] //Reset de volgorde die de gebruiker heeft ingegeven
      setTimeout(() => {
        volgendeRonde() //Ga naar de volgende ronde
      }, 1000)
      return
    }
  }

  function startGame() { //Functie die het spelletje start
    poging++
    volgendeRonde() //Ga naar ronde 1
    $("#startknop").css({
      "visibility": "hidden"
    }) //Startknop wordt onzichtbaar
  }

  knopContainer.addEventListener("click", event => { //Functie die detecteert als er een knop wordt ingedrukt en de data (kleur en geluidje) verwerkt
    const {
      knop
    } = event.target.dataset
    if (knop) handleClick(knop)
  })