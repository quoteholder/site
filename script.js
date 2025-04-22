let total = 545 - 1;

function pickSlide(number, returnOnly = false) {
  if (!number && number !== 0) {
    number = Math.floor(Math.random() * (total - 3)) + 3;
  }

  number = number % total || total;

  document.getElementById("imagetransition").src =
    "slides/Famous GPS QUotes (The Archive)-images-" +
    number.toString() +
    ".jpg";
  document.getElementById("image").style.animation =
    "transition0 1s ease-in-out forwards";
  document.getElementById("imagetransition").style.animation =
    "transition1 1s ease-in-out forwards";
  document.getElementById("imagetransition").style.display = "block";

  setTimeout(() => {
    document.getElementById("image").src =
      document.getElementById("imagetransition").src;
    setTimeout(() => {
      document.getElementById("imagetransition").style.display = "none";
      document.getElementById("image").style.animation = "none";
      document.getElementById("imagetransition").style.animation = "none";
    }, 10);
  }, 1000);

  document.getElementById("title").innerText =
    "Daily Dose of GPS Quotes (" + (number + 1).toString() + ")";

  window.location.hash = "slide-" + (number + 1).toString();
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
    date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate();
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
      pickSlide(slideNumber - 1, true);
    }
  }
} else {
  pickSlide(getDailyRandom(0, 1e64));
}

window.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    pickSlide();
  }
});
