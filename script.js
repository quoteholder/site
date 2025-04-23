let total = 547;

let alt = [197, 232];

let history = [];

let historyindex = 0;

function randomise() {
  return Math.floor(Math.random() * (total - 3)) + 3;
}

function pickSlide(number, backwards, add) {

  number = number % total || total;

  let useAlt = false;
  let last = parseInt(window.location.hash.substring(7), 10);

  if (alt.includes(last) && history.length != 0) {
    number = last;
    useAlt = true;
  }

  // alert(alt);

  document.getElementById("imagetransition").src =
    "slides/" + (useAlt ? "alt/" : "") + "quotes-" + number.toString() + ".png";
  document.getElementById("image").style.animation =
    "transition" +
    (backwards ? "1" : "0") +
    " 1s ease-in-out forwards" +
    (backwards ? " reverse" : "");
  document.getElementById("imagetransition").style.animation =
    "transition" +
    (backwards ? "0" : "1") +
    " 1s ease-in-out forwards" +
    (backwards ? " reverse" : "");
  document.getElementById("imagetransition").style.display = "block";

  setTimeout(() => {
    document.getElementById("image").src =
      document.getElementById("imagetransition").src;
    setTimeout(() => {
      document.getElementById("imagetransition").style.display = "none";
      document.getElementById("image").style.animation = "none";
      document.getElementById("imagetransition").style.animation = "none";
    }, 10);
    if (add) {
      history.push(number);
    }
  }, 1000);

  document.getElementById("title").innerText =
    "Daily Dose of GPS QUotes (" + number.toString() + ")";

  window.location.hash = "slide-" + number.toString();
}

document.getElementById("icon").href =
  "https://dailydoseofgpsquotes.com/icons/DDOGPSQICONZ-" +
  ((Math.floor(Math.random() * 420) + 1) % 42).toString() +
  ".jpg";

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDailyRandom(min = 0, max = 1) {
  const date = new Date();
  const seed =
    date.getFullYear() * 1000 +
    date.getMonth() * 100 +
    (date.getDate() - (date.getHours() >= 12 ? 1 : 0));
  const rand = seededRandom(seed);
  return Math.floor(rand * (max - min + 1)) + min;
}

setTimeout(() => {
  document.getElementById("loader").style.animation =
    "loader 1s ease-in-out forwards";
}, 1000);

function slideAnimation() {}

if (window.location.hash) {
  const hash = window.location.hash.substring(1);
  if (hash.startsWith("slide-")) {
    const slideNumber = parseInt(hash.substring(6), 10);
    if (!isNaN(slideNumber)) {
      pickSlide(slideNumber, false, true);
    }
  }
} else {
  pickSlide(getDailyRandom(0, 1e64), false, true);
}

window.addEventListener("keyup", function (event) {
  if (event.key === " " || event.key === "ArrowRight") {
    if (historyindex + 1 < history.length) {
      historyindex++;
      pickSlide(history[historyindex], false, false);
    } else {
      pickSlide(randomise(), false, true);
      historyindex++;
    }
  } else if (event.key === "ArrowLeft") {
    if (historyindex - 1 >= 0) {
      historyindex--;
      pickSlide(history[historyindex], true, false);
    }
  }
});
