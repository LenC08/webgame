//Timer: is nog niet zichtbaar maar wel al gemaakt

function timerStart() {
  let minuut = 30; // We kiezen de duur van de timer
  let seconde = 00;
  setInterval(function () { //We maken een interval dat elke seconde volgende functie herhaalt:
    document.getElementById("timer").innerHTML = minuut + " : " + seconde; //We updaten de website met de nieuwe minuut en seconde waarden
    seconde--; // -1 seconde
    if (seconde < 0 && minuut >= 1) { //Als er een minuut om is maar er zijn nog minuten over:
      minuut--; // -1 minuut
      seconde = 59; //seconde is terug 59 
    } else if (minuut == 0 && seconde < 0) { //Als de timer gedaan is:
      document.getElementById("timer").innerHTML = "gedaan!" // Update de website dat de timer gedaan is
    }
  }, 1000); //1000 miliseconden = 1 seconde
};

