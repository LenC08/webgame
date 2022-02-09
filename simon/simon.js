  let volgorde = []
  let userVolgorde = []
  let ronde = 1
  let lifeAmount = 5
  const knopContainer = document.querySelector(".knopcontainer")
  const foutGeluid = document.querySelector (`[data-sound="fout"]`)

  function gameEnd() {
    alert("hier moet nog iets komen :)")
  }

  function loseLife() {
  if (lifeAmount >= 2) {
     $("#simon-leven" + lifeAmount).addClass("animate__zoomOutRight animate__animated")
      lifeAmount--
    } else if (lifeAmount == 1) {
      gameEnd()
   }
  }

  function resetSpel() {
    alert("GAME OVER")
    volgorde = []
    userVolgorde = []
    ronde = 0
    knopContainer.classList.add("onklikbaar")
    loseLife()
    $("#startknop").css({"visibility": "visible"})
    foutGeluid.play()
    
  }

  function userBeurt(ronde) {
    knopContainer.classList.remove("onklikbaar")
  }

  function activeerKnop(color) {
    const knop = document.querySelector(`[data-knop="${color}"]`)
    const sound = document.querySelector(`[data-sound="${color}"]`)
    
    sound.play()
    knop.classList.add("geactiveerd")

    setTimeout(() => {
      knop.classList.remove("geactiveerd")
    }, 300)
  }

  function speelVolgordeAf(volgendeVolgorde) {
    volgendeVolgorde.forEach((color, index) => {
      setTimeout(() => {
          activeerKnop(color)
      }, (index + 1) * 800 + 1000)
    })
  }

  function volgendeStap() {
    const knoppen = ["roze", "groen", "blauw", "rood", "geel"]
    const randomKnop = knoppen[Math.floor(Math.random() * knoppen.length)]
    return randomKnop
  }

  function volgendeRonde() {
    ronde++

    knopContainer.classList.add("onklikbaar")

    const volgendeVolgorde = [...volgorde]
    volgendeVolgorde.push(volgendeStap())
    speelVolgordeAf(volgendeVolgorde)
    console.log("start")

    volgorde = [...volgendeVolgorde]
    setTimeout(() => {
      userBeurt(ronde)
      console.log("test")
    }, ronde * 600 + 1000)
  }

  function handleClick(knop) {
    const index = userVolgorde.push(knop) - 1
    const sound = document.querySelector(`[data-sound="${knop}"]`);
    sound.play()
    
    const clicksLeft = volgorde.length - userVolgorde.length

    if (userVolgorde[index] !== volgorde[index]) {
      resetSpel()
      return
    }

    if (volgorde.length === userVolgorde.length) {
      userVolgorde = []
      setTimeout(() => {
        volgendeRonde()
      }, 1000)
    return
    }
  }
  
  function startGame() {
    volgendeRonde()
    $("#startknop").css({"visibility": "hidden"})
  }

  knopContainer.addEventListener("click", event => {
    const { knop } = event.target.dataset

    if (knop) handleClick(knop)
  })


 

 

  
  







