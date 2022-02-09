function timerStart() {
  let minuut = 30;
  let seconde = 00;
  setInterval(function () {
    document.getElementById("timer").innerHTML =
      minuut + " : " + seconde;
    seconde--;
    if (seconde < 0 && minuut >= 1) {
      minuut--;
      seconde = 59;
    } else if (minuut == 0 && seconde < 0) {
      document.getElementById("timer").innerHTML = "gedaan!"
    }
  }, 1000);
};

