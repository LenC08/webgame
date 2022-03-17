  //Enkele variablen die we nodig hebben:
  let volgorde = []
  let userVolgorde = []
  let ronde = 1
  let lifeAmount = 5
  const knopContainer = document.querySelector(".knopcontainer")
  const foutGeluid = document.querySelector (`[data-sound="fout"]`)

  function gameEnd() { //Functie wanneer de game gedaan is (nog niet geïmplementeerd)
    alert("hier moet nog iets komen :)")
  }

  function loseLife() { //Zelfde als in game.js
  if (lifeAmount >= 2) {
     $("#simon-leven" + lifeAmount).addClass("animate__zoomOutRight animate__animated")
      lifeAmount--
    } else if (lifeAmount == 1) {
      gameEnd()
   }
  }

  function resetSpel() { //Functie wanneer je de foute kleur kiest
    foutGeluid.play() //Speel geluidje af wanneer het fout is
    alert("GAME OVER")
    //We resetten het spel
    volgorde = [] 
    userVolgorde = []
    ronde = 0

    knopContainer.classList.add("onklikbaar") //Knopjes zijn niet klikbaar tot je terug op start duwt
    loseLife() //Er gaat een leven af
    $("#startknop").css({"visibility": "visible"}) //Startknop is terug zichtbaar
    
    
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
    volgendeRonde() //Ga naar ronde 1
    $("#startknop").css({"visibility": "hidden"}) //Startknop wordt onzichtbaar
  }

  knopContainer.addEventListener("click", event => { //Functie die detecteert als er een knop wordt ingedrukt en de data (kleur en geluidje) verwerkt
    const { knop } = event.target.dataset
    if (knop) handleClick(knop)
  })


 

 

  
  







